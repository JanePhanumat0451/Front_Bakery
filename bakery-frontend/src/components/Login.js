import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from '../assets/ddd.jpg'; // Correct the path to the image

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh

        // Validate username and password
        if (username === "admin" && password === "1234") {
            // Save token to localStorage (mock token in this case)
            localStorage.setItem("token", "your-login-token");

            // Navigate to the home page
            navigate("/");
        } else {
            setError("Incorrect username or password");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#FDEBD0] to-[#F5CBA7]">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex overflow-hidden">
                {/* Image Section */}
                <div className="hidden md:block w-1/2">
                    <img
                        src={loginImage} // Using the correct image path
                        className="h-full object-cover"
                        alt="Login illustration"
                    />
                </div>
                
                {/* Form Section */}
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-3xl font-extrabold text-center text-[#8B4513] mb-4">
                        Bakery Management System
                    </h1>
                    <hr className="border-t-2 border-[#8B4513] mb-6" />

                    <div className="text-center mb-6">
                        <h3 className="text-xl text-[#D2691E]">Please Sign In</h3>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] border-[#F0C998]"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2691E] border-[#F0C998]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="w-full bg-[#D2691E] text-white py-3 rounded-lg hover:bg-[#8B4513] transition duration-300"
                            >
                                Sign In
                            </button>
                        </div>
                        {error && (
                            <div className="text-center text-red-600 mb-4">
                                {error}
                            </div>
                        )}
                        <div className="text-center text-sm text-[#A0522D]">
                            Not a member yet?{" "}
                            <a href="/" className="underline hover:text-[#8B4513] transition-colors duration-300">
                                Register here
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
