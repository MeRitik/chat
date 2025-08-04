import React, { useState, useEffect, useContext } from 'react';
import { MessageCircle, Search, Plus, Users } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatInterface from '../components/ChatInterface';
import AuthContext from '../context/AuthContext';
import NoChatSelected from '../components/NoChatSelected';

const ChatsListPage = () => {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const { getAllGroups, groups } = useContext(AuthContext);

    useEffect(() => {
        getAllGroups();
    }, [getAllGroups]);

    const filteredGroups = Array.isArray(groups)
        ? groups.filter(group =>
            group.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handleGroupSelect = (group) => {
        navigate(`/chats/${group.id}`);
    };

    const getInitials = (name) => {
        return name
            ? name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
            : '';
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
        if (!id) return gradients[0];
        const hashCode = id.toString().split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        return gradients[Math.abs(hashCode) % gradients.length];
    };

    const selectedChat = filteredGroups.find(group => String(group.id) === String(chatId));

    useEffect(() => {
        if (chatId && !selectedChat) {
            navigate('/groups', { replace: true });
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
                        {filteredGroups.length > 0 ? (
                            filteredGroups.map((group) => (
                                <div
                                    key={group.id}
                                    onClick={() => handleGroupSelect(group)}
                                    className={`flex items-center p-3 rounded-xl cursor-pointer transition-all hover:bg-gray-700 mb-1 ${String(chatId) === String(group.id) ? 'bg-gray-700 border-l-2 border-blue-500' : ''
                                        }`}
                                >
                                    {/* Avatar */}
                                    <div className="relative flex-shrink-0">
                                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRandomGradient(group.id)} flex items-center justify-center text-white font-semibold shadow-sm`}>
                                            {group.type === 'group' ? (
                                                <Users className="w-6 h-6" />
                                            ) : (
                                                getInitials(group.name)
                                            )}
                                        </div>
                                    </div>

                                    {/* Chat Info */}
                                    <div className="ml-3 flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-white truncate">
                                                {group.name}
                                            </h3>
                                            <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                                                {group.lastMessageTime}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400 truncate mt-0.5">
                                            {group.lastMessage}
                                        </p>
                                    </div>
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
                ) : <NoChatSelected />}
            </div>
        </div>
    );
};

export default ChatsListPage;