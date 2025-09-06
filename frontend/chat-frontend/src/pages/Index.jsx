import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, User, Users, MessageSquare, Settings, LogOut, Search, MessageSquarePlus, ChevronLeft, ChevronRight, X, Menu } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import IndexHeader from '../components/IndexHeader';
import AuthContext from '../context/AuthContext';


export default function Index() {
    const [mounted, setMounted] = useState(false);
    const [isSidebarShrunk, setIsSidebarShrunk] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, user } = useAuth();
    const { groupCount } = useContext(AuthContext);


    // Get current active tab from URL
    const getCurrentTab = () => {
        const path = location.pathname.split('/')[1];
        return path || 'chats';
    };


    const activeTab = getCurrentTab();


    useEffect(() => {
        setMounted(true);
    }, []);


    // Shrink sidebar automatically when 'chats' is the active tab
    useEffect(() => {
        if (activeTab === 'chats') {
            setIsSidebarShrunk(true);
        } else {
            setIsSidebarShrunk(false);
        }
    }, [activeTab]);


    const sidebarOptions = [
        {
            id: 'profile',
            path: '/profile',
            icon: User,
            label: 'Profile',
            count: null
        },
        {
            id: 'chats',
            path: '/chats',
            icon: MessageSquare,
            label: 'Chats',
            count: groupCount
        },
        {
            id: 'groups',
            path: '/groups',
            icon: Users,
            label: 'Join Group',
            count: null
        },
        {
            id: 'create',
            path: '/create',
            icon: MessageSquarePlus,
            label: 'Create Chat',
            count: null
        }
    ];

    const toggleSidebar = () => {
        setIsSidebarShrunk(!isSidebarShrunk);
    };


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

            {/* Toggle Button - positioned absolutely on the page, not inside sidebar */}
            <button
                onClick={toggleSidebar}
                className={`
        fixed top-1/2 -translate-y-1/2 z-50
        bg-gray-700 hover:bg-gray-600 text-white p-1.5 rounded-full 
        border border-gray-600 shadow-lg 
        transition-all duration-300 hover:scale-110 
        focus:outline-none
    `}
                style={{ left: `${isSidebarShrunk ? '60px' : '240px'}` }}
                aria-label="Toggle Sidebar"
            >
                {isSidebarShrunk ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Sidebar */}
            <div className={`
    ${isSidebarShrunk ? 'w-20' : 'w-64'} 
    bg-gray-800 border-r border-gray-700 flex flex-col 
    transform transition-all duration-300 ease-in-out
    ${mounted ? 'translate-x-0' : '-translate-x-4'} 
    relative z-10
`}>
                <IndexHeader isShrunk={isSidebarShrunk} />


                {/* Navigation */}
                <div className="p-4 flex-1 overflow-y-auto">
                    <nav className="space-y-2">
                        {sidebarOptions.map((option) => {
                            const Icon = option.icon;
                            const isActive = activeTab === option.id;


                            return (
                                <button
                                    key={option.id}
                                    onClick={() => navigate(option.path)}
                                    className={`
                                        w-full flex items-center 
                                        ${isSidebarShrunk ? 'justify-center' : 'gap-3 px-4'} 
                                        py-3 rounded-lg text-left transition-all duration-200 group 
                                        ${isActive
                                            ? 'bg-gray-700 text-white border border-gray-600'
                                            : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
                                        }
                                    `}
                                >
                                    <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`} />
                                    {!isSidebarShrunk && (
                                        <span className="font-medium flex-1 text-sm whitespace-nowrap">
                                            {option.label}
                                        </span>
                                    )}
                                    {!isSidebarShrunk && option.count && (
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
                    <div className={`flex items-center mb-3 ${isSidebarShrunk ? 'justify-center' : 'gap-3'}`}>
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center border border-gray-600">
                            <User className="w-5 h-5 text-gray-300" />
                        </div>
                        {!isSidebarShrunk && (
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">{user}</p>
                                <p className="text-xs text-gray-400">Online</p>
                            </div>
                        )}
                    </div>


                    <div className={`flex ${isSidebarShrunk ? 'flex-col gap-2' : 'gap-2'}`}>
                        <button className={`
                            ${isSidebarShrunk ? 'w-full' : 'flex-1'}
                            flex items-center justify-center gap-2 px-3 py-2 
                            bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 
                            hover:text-white transition-all duration-200 text-sm
                        `}>
                            <Settings className="w-4 h-4" />
                            {!isSidebarShrunk && <span>Settings</span>}
                        </button>
                        <button
                            onClick={() => logout()}
                            className={`
                                ${isSidebarShrunk ? 'w-full' : ''}
                                flex items-center justify-center 
                                px-3 py-2 bg-gray-700 hover:bg-red-600 rounded-lg 
                                text-gray-300 hover:text-white transition-all duration-200 text-sm gap-2
                            `}
                        >
                            <LogOut className="w-4 h-4" />
                            {!isSidebarShrunk && <span>Log Out</span>}
                        </button>
                    </div>
                </div>
            </div>


            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative z-10">
                <div className="flex-1 bg-gray-900 relative">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}