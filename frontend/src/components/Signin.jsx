import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Import AuthContext

export const Signin = () => {
    const [data, setData] = useState({
        identifier: "", // Can be email or username
        password: "",
    });
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Use login from context

    function changeHandler(event) {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    async function submitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch("https://euphonious-cassata-f58cae.netlify.app/api/auth/local", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    identifier: data.identifier, 
                    password: data.password,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                login(result.jwt); // Update global auth state
                localStorage.setItem("userId", result.user.id); // Store user ID if needed
                setMessage("Login successful! Redirecting...");

                setTimeout(() => {
                    navigate("/"); // Redirect to homepage
                }, 1000);
            } else {
                setMessage(result.error.message || "Login failed.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
            console.error("Login error:", error);
        }
    }

    return (
        <div className="flex h-full items-center justify-center bg-gradient-to-r from-slate-300 to-slate-500 p-4">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>

                {message && (
                    <p className={`text-center text-sm ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                )}

                <form onSubmit={submitHandler} className="space-y-4">
                    <input 
                        type="text"
                        name="identifier"
                        value={data.identifier}
                        placeholder="Enter your email or username"
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
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};
