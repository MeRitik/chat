import React, { useState, useEffect } from 'react';
import { MessageCircle, Search, Plus, MoreHorizontal, Hash, Users, Settings, User } from 'lucide-react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import ChatInterface from '../components/ChatInterface';

const ChatListPage = () => {
    const { chatId } = useParams(); // Get chatId from URL
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Mock chat data - replace with your actual data source
    const [chats] = useState([
        {
            id: 'general-discussion',
            name: 'General Discussion',
            type: 'group',
            lastMessage: 'Hey everyone, how\'s the project going?',
            lastMessageTime: '2m ago',
            unreadCount: 3,
            avatar: null,
            isOnline: true
        },
        {
            id: 'sarah-wilson',
            name: 'Sarah Wilson',
            type: 'direct',
            lastMessage: 'Can we schedule a meeting for tomorrow?',
            lastMessageTime: '5m ago',
            unreadCount: 1,
            avatar: null,
            isOnline: true
        },
        {
            id: 'development-team',
            name: 'Development Team',
            type: 'group',
            lastMessage: 'The new feature is ready for testing',
            lastMessageTime: '1h ago',
            unreadCount: 0,
            avatar: null,
            isOnline: false
        },
        {
            id: 'mike-johnson',
            name: 'Mike Johnson',
            type: 'direct',
            lastMessage: 'Thanks for the update!',
            lastMessageTime: '2h ago',
            unreadCount: 0,
            avatar: null,
            isOnline: false
        },
        {
            id: 'design-review',
            name: 'Design Review',
            type: 'group',
            lastMessage: 'The mockups look great',
            lastMessageTime: '1d ago',
            unreadCount: 0,
            avatar: null,
            isOnline: false
        }
    ]);

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChatSelect = (chat) => {
        // Navigate to the chat URL with the chat ID
        navigate(`/chats/${chat.id}`);
    };

    const getInitials = (name) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    };

    const getRandomGradient = (id) => {
        const gradients = [
            'from-blue-500 to-purple-600',
            'from-green-500 to-teal-600',
            'from-orange-500 to-red-600',
            'from-pink-500 to-rose-600',
            'from-indigo-500 to-blue-600',
            'from-yellow-500 to-orange-600'
        ];
        // Use a simple hash function for consistent colors
        const hashCode = id.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        return gradients[Math.abs(hashCode) % gradients.length];
    };

    // Find the selected chat based on URL parameter
    const selectedChat = chats.find(chat => chat.id === chatId);

    // Effect to handle initial load or invalid chat IDs
    useEffect(() => {
        if (chatId && !selectedChat) {
            // If chatId is provided but chat not found, redirect to chats list
            navigate('/chats', { replace: true });
        }
    }, [chatId, selectedChat, navigate]);

    return (
        <div className="flex h-full bg-gray-900">
            {/* Sidebar */}
            <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col shadow-sm">
                {/* Header */}
                <div className="p-6 border-b border-gray-700">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-[11px] bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-2">
                        {filteredChats.length > 0 ? (
                            filteredChats.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => handleChatSelect(chat)}
                                    className={`flex items-center p-3 rounded-xl cursor-pointer transition-all hover:bg-gray-700 mb-1 ${chatId === chat.id ? 'bg-gray-700 border-l-2 border-blue-500' : ''
                                        }`}
                                >
                                    {/* Avatar */}
                                    <div className="relative flex-shrink-0">
                                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRandomGradient(chat.id)} flex items-center justify-center text-white font-semibold shadow-sm`}>
                                            {chat.type === 'group' ? (
                                                <Users className="w-6 h-6" />
                                            ) : (
                                                getInitials(chat.name)
                                            )}
                                        </div>
                                    </div>

                                    {/* Chat Info */}
                                    <div className="ml-3 flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-white truncate">
                                                {chat.name}
                                            </h3>
                                            <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                                                {chat.lastMessageTime}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400 truncate mt-0.5">
                                            {chat.lastMessage}
                                        </p>
                                    </div>

                                    {/* Unread Count */}
                                    {chat.unreadCount > 0 && (
                                        <div className="ml-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                                            {chat.unreadCount}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 mt-8">
                                <Search className="w-8 h-8 mx-auto mb-2" />
                                <p>No chats found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {selectedChat ? (
                    <div className="flex-1 bg-gray-900 text-white">
                        <ChatInterface selectedChat={selectedChat} />
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-900">
                        <div className="text-center max-w-md">
                            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <MessageCircle className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-3">Welcome to ChatFlow</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Select a chat from the sidebar to start messaging, or create a new conversation to get started.
                            </p>
                            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                                <Plus className="w-5 h-5 inline mr-2" />
                                Start New Chat
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatListPage;