import { useState, useEffect, useContext } from 'react';
import { MessageCircle, User, Mail, Lock, ArrowRight, Eye, EyeOff, MessageCircleMore } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { login } = useContext(AuthContext);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const loginResult = await login({ username: formData.email, password: formData.password });

        if (!loginResult.success) {
            toast.error("Login failed: " + loginResult.error);
        }

        // Reset form data after submission
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            username: ''
        });

        // Redirect to home page on successful login
        if (loginResult.success) {
            navigate('/home');
        }

        setIsLoading(false);
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            username: ''
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Subtle animated background */}
            <div className="absolute inset-0 opacity-5">
                {Array.from({ length: 12 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                            left: `${(i % 4) * 25 + Math.random() * 10}%`,
                            top: `${Math.floor(i / 4) * 33 + Math.random() * 10}%`,
                            animationDelay: `${i * 0.8}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    >
                        <MessageCircle
                            size={16 + Math.random() * 8}
                            className="text-white transform rotate-12"
                        />
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 opacity-5">
                {Array.from({ length: 4 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                            left: `${(i % 4) * 33 + Math.random() * 10}%`,
                            top: `${Math.floor(i / 4) * 33 + Math.random() * 8}%`,
                            animationDelay: `${i * 0.8}s`,
                            animationDuration: `${5 + Math.random() * 2}s`
                        }}
                    >
                        <MessageCircleMore
                            size={16 + Math.random() * 8}
                            className="text-white transform rotate-12"
                        />
                    </div>
                ))}
            </div>

            {/* Moving dots animation */}
            <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 8 }, (_, i) => (
                    <div
                        key={`dot-${i}`}
                        className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 1.2}s`,
                            animationDuration: '4s'
                        }}
                    />
                ))}
            </div>
            {/* Main container */}
            <div className={`w-full max-w-md transform transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                {/* Logo and title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg mb-4 border border-gray-700">
                        <MessageCircle className="w-6 h-6 text-gray-300" />
                    </div>
                    <h1 className="text-2xl font-semibold text-white mb-1">Welcome back</h1>
                    <p className="text-gray-400 text-sm">Sign in to your account to continue</p>
                </div>

                {/* Form container */}
                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
                    {/* Toggle buttons */}
                    <div className="flex bg-gray-900 rounded-lg p-1 mb-6 border border-gray-700">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2.5 px-4 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer ${isLogin
                                ? 'bg-gray-700 text-white shadow-sm'
                                : 'text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2.5 px-4 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer ${!isLogin
                                ? 'bg-gray-700 text-white shadow-sm'
                                : 'text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        {/* Username field (signup only) */}
                        <div className={`transition-all duration-300 overflow-hidden ${!isLogin ? 'max-h-20 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'
                            }`}>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Email field */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                            />
                        </div>

                        {/* Password field */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="w-full pl-10 pr-10 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Confirm password field (signup only) */}
                        <div className={`transition-all duration-300 overflow-hidden ${!isLogin ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Forgot password (login only) */}
                        {isLogin && (
                            <div className="text-right">
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-300 text-sm transition-colors cursor-pointer"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full bg-white text-gray-900 py-3 rounded-lg font-medium text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6 cursor-pointer"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-gray-600 border-t-gray-900 rounded-full animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Toggle text */}
                    <p className="text-center text-gray-400 text-sm mt-6">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={toggleMode}
                            className="text-white hover:text-gray-300 ml-1 font-medium transition-colors underline underline-offset-2 cursor-pointer"
                        >
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-xs mt-8">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}