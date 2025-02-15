import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use navigate for redirection
import API from "../api/axiosInstance"; // Import Axios instance

export const Signup = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState(null);
    const navigate = useNavigate(); // For navigation

    function changeHandler(event) {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    async function submitHandler(event) {
        event.preventDefault();

        try {
            const response = await API.post("/api/auth/local/register", {
                username: data.username,
                email: data.email,
                password: data.password,
            });

            const result = response.data;

            if (response.status === 200) {
                localStorage.setItem("jwt", result.jwt);
                localStorage.setItem("userId", result.user.id);
                setMessage("Signup successful! Redirecting...");

                setTimeout(() => {
                    navigate("/"); // Redirect to homepage after signup
                }, 2000);
            } else {
                setMessage(result.error?.message || "Signup failed.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
            console.error("Signup error:", error);
        }

        setData({ username: "", email: "", password: "" });
    }

    return (
        <div className="flex h-full items-center justify-center bg-gradient-to-r from-slate-300 to-slate-500 p-4">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>

                {message && (
                    <p className={`text-center text-sm ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                )}

                <form onSubmit={submitHandler} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        value={data.username}
                        placeholder="Enter your username"
                        onChange={changeHandler}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="Enter your email"
                        onChange={changeHandler}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={changeHandler}
                        placeholder="Enter password"
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};
