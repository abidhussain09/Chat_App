import React, { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("jwt"));

    useEffect(() => {
        // Update token from localStorage when app loads
        const storedToken = localStorage.getItem("jwt");
        setToken(storedToken);
    }, []);

    // Login function
    const login = (newToken) => {
        localStorage.setItem("jwt", newToken);
        setToken(newToken); // Update state to trigger re-render
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("jwt");
        setToken(null); // Update state
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
