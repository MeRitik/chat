import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, User, Users, MessageSquare, Settings, LogOut, Search } from 'lucide-react';
import AuthContext from '../context/AuthContext';

export default function Index() {
    const [mounted, setMounted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useContext(AuthContext);

    // Get current active tab from URL
    const getCurrentTab = () => {
        const path = location.pathname.split('/')[1];
        return path || 'chats';
    };

    const activeTab = getCurrentTab();

    useEffect(() => {
        setMounted(true);
    }, []);

    const sidebarOptions = [
        {
            id: 'profile',
            path: '/profile',
            icon: User,
            label: 'Profile',
            count: null
        },
        {
            id: 'groups',
            path: '/groups',
            icon: Users,
            label: 'Join Group',
            count: null
        },
        {
            id: 'chats',
            path: '/chats',
            icon: MessageSquare,
            label: 'Chats',
            count: 12
        }
    ];

    return (
        <div className="h-screen bg-gray-900 flex overflow-hidden">
            {/* Subtle animated background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                {Array.from({ length: 8 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                            left: `${(i % 4) * 25 + Math.random() * 10}%`,
                            top: `${Math.floor(i / 2) * 25 + Math.random() * 10}%`,
                            animationDelay: `${i * 1.5}s`,
                            animationDuration: `${4 + Math.random() * 2}s`
                        }}
                    >
                        <MessageCircle
                            size={12 + Math.random() * 6}
                            className="text-white transform rotate-12"
                        />
                    </div>
                ))}
            </div>

            {/* Sidebar */}
            <div className={`w-64 bg-gray-800 border-r border-gray-700 flex flex-col transform transition-all duration-500 ${mounted ? 'translate-x-0' : '-translate-x-4'} relative z-10`}>
                {/* Header */}
                <div className="p-6 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
                            <MessageCircle className="w-5 h-5 text-gray-300" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-white">ChatFlow</h1>
                            <p className="text-sm text-gray-400">Connected</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="p-4">
                    <nav className="space-y-2">
                        {sidebarOptions.map((option) => {
                            const Icon = option.icon;
                            const isActive = activeTab === option.id;

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => navigate(option.path)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${isActive
                                        ? 'bg-gray-700 text-white border border-gray-600'
                                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`} />
                                    <span className="font-medium flex-1">{option.label}</span>
                                    {option.count && (
                                        <span className={`px-2 py-1 text-xs rounded-full ${isActive
                                            ? 'bg-gray-600 text-gray-200'
                                            : 'bg-gray-700 text-gray-400'
                                            }`}>
                                            {option.count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* User section at bottom */}
                <div className="mt-auto p-4 border-t border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center border border-gray-600">
                            <User className="w-5 h-5 text-gray-300" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-white">John Doe</p>
                            <p className="text-xs text-gray-400">Online</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm">
                            <Settings className="w-4 h-4" />
                            Settings
                        </button>
                        <button onClick={() => logout()} className="flex items-center justify-center px-3 py-2 bg-gray-700 hover:bg-red-600 rounded-lg text-gray-300 hover:text-white transition-all duration-200">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col relative z-10">
                <div className="flex-1 bg-gray-900 relative">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}