import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export const Signout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Clears token from context & localStorage
        
        // Force immediate navigation after logout
        setTimeout(() => {
            navigate("/signin", { replace: true });
        }, 100); // Small delay ensures state is updated
    };

    return (
        <div className="flex items-center gap-3 justify-center w-full h-full">
            <div className="flex flex-col gap-3 w-3/4 max-w-md p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl">Click below to sign out</h1>
                <button onClick={handleLogout} className="p-3 bg-red-500 text-white rounded-lg">
                    Signout
                </button>
            </div>
        </div>
    );
};
