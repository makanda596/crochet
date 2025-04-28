import { useState } from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi"; // Feather icons
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa"; // Social icons
import { useAuthStore } from '../utilis/auth';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const {login,error}=useAuthStore()

    const handleSubmit = async(e) => {
        e.preventDefault();
        await login(username,password)
        window.location.href='/home'
        console.log({ username, password, rememberMe });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-purple-600 mb-2">
                        <span className="text-pink-500">Crochet</span> Haven
                    </h1>
                    <p className="text-gray-600">Welcome back! Please sign in to continue</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <p className='text-red-500'>{error}</p>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                            placeholder="••••••••"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 bottom-2.5 text-gray-400 hover:text-purple-600 transition-colors"
                        >
                            {showPassword ? (
                                <FiEyeOff className="h-6 w-6" />
                            ) : (
                                <FiEye className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="rounded text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-purple-600 hover:text-purple-700">
                            Forgot password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
                    >
                        Sign In
                    </button>
                </form>

             
               

               
            </div>
        </div>
    );
};

export default LoginPage;