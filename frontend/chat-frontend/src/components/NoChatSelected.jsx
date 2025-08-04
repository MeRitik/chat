import { MessageCircle, Plus } from "lucide-react";
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function NoChatSelected() {

    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate('/groups');
    };

    return (
        <div className="flex-1 flex items-center justify-center bg-gray-900 overflow-hidden">
            <div className="relative text-center max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm animate-fade-in">

                {/* Subtle background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-600 opacity-20 rounded-full blur-3xl transform scale-150 animate-pulse-slow z-0"></div>

                <div className="relative z-10">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl transform transition-transform duration-300 hover:scale-105">
                        <MessageCircle className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white mb-3 tracking-wide">Welcome to ChatFlow</h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Select a chat from the sidebar to start messaging, or click the button below to create a new conversation and connect with friends.
                    </p>
                    <button onClick={handleOnClick} className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-cyan-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group">
                        <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative z-10 flex items-center justify-center">
                            <Plus className="w-5 h-5 inline mr-2" />
                            Start New Chat
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}