import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // To redirect if user is not logged in
import socket from "../socket";

export const ChatBox = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    // Retrieve user ID and token from localStorage
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("jwt");

    // Redirect to Signin if user is not authenticated
    useEffect(() => {
        if (!userId || !token) {
            navigate("/signin");
        }
    }, [userId, token, navigate]);

    // Fetch previous messages from Strapi
    useEffect(() => {
        if (!userId || !token) return;

        const fetchMessages = async () => {
            try {
                const response = await fetch(
                    `https://chatapp-production-0e9e.up.railway.app/api/chats?filters[user][id][$eq]=${userId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include", // Allows sending cookies & tokens
                    }
                );
                const data = await response.json();
                if (data.data) {
                    setMessages(data.data.map(chat => chat.message_text));
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [userId, token]);

    // Listen for new messages via WebSocket
    useEffect(() => {
        socket.on("message", (msg) => {
            setMessages((prev) => [...prev, msg.message_text]);
        });

        return () => socket.off("message");
    }, []);

    // Scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Send a message to WebSocket and save it in Strapi
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!userId || !token) {
            alert("You need to sign in first!");
            return;
        }
        if (message.trim()) {
            // Emit message to WebSocket
            socket.emit("message", { userId, message });

            // Save message in Strapi with correct format
            try {
                const response = await fetch("https://chatapp-production-0e9e.up.railway.app/api/chats", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        data: {  // Notice the 'data' wrapper
                            message_text: message,
                            message_date: new Date().toISOString(),
                            user: userId  // Full URL path required
                        }
                    })
                });

                const data = await response.json();
                if (response.ok) {
                    console.log("Message sent successfully:", data);
                } else {
                    console.error("Failed to send message:", data);
                }
            } catch (error) {
                console.error("Error saving message:", error);
            }
            setMessage("");
        }
    };

    return (
        <div className="w-full h-full max-w-5xl my-5 mx-auto p-5 bg-slate-200 shadow-xl rounded-xl">
            <h2 className="text-3xl font-bold text-gray-700 text-center">Chat Room</h2>

            {/* Chat Messages */}
            <div className="h-4/5 overflow-y-auto border border-gray-300 p-3 rounded-lg bg-gray-50 mt-4">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-3 my-2 text-white rounded-xl shadow-md max-w-xs ${idx % 2 === 0
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 self-end"
                            : "bg-gray-600"
                            }`}
                    >
                        {msg}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input Form */}
            <form onSubmit={sendMessage} className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400"
                    placeholder="Type your message..."
                />
                <button
                    type="submit"
                    className="bg-blue-600 flex gap-2 text-white px-5 py-3 rounded-full hover:bg-blue-700 transition"
                >
                    <p className="text-xl">Send</p>
                </button>
            </form>
        </div>
    );
};
