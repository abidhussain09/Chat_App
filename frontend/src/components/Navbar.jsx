import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext"; 

export const Navbar = () => {
    const { token, logout } = useContext(AuthContext);
    return (
        <div className="w-full bg-blue-500 flex justify-between items-center px-4 h-20">
            <div className="text-2xl">
                <Link to="/">CHAT APP</Link>
            </div>
            {!token ? (
                <div className="flex gap-4 text-xl">
                    <Link to="/signin">
                        <div className="cursor-pointer bg-slate-800 text-white px-4 py-2 rounded-xl">
                            Signin
                        </div>
                    </Link>
                    <Link to="/signup">
                        <div className="cursor-pointer bg-slate-800 text-white px-4 py-2 rounded-xl">
                            Signup
                        </div>
                    </Link>
                </div>
            ) : (
                <Link to="/signout">
                <div
                    className="cursor-pointer bg-slate-800 text-white px-4 py-2 rounded-xl"
                    >
                    Signout
                </div>
                </Link>
            )}
        </div>
    );
};
