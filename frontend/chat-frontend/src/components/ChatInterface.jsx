import { useState, useRef, useEffect } from 'react';
import { Send, Smile, Users, ArrowLeft } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ChatInterface = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { fetchGroupData, currentGroupData, user } = useAuth();

    const location = useLocation();
    const groupId = location.pathname.split('/').pop();
    const messagesEndRef = useRef(null);

    // Fetch group data on component mount
    useEffect(() => {
        const loadGroupData = async () => {
            if (groupId) {
                try {
                    setLoading(true);
                    setError(null);
                    await fetchGroupData(groupId);
                } catch (err) {
                    console.error('Failed to fetch group data:', err);
                    setError('Failed to load chat. Please try again.');
                } finally {
                    setLoading(false);
                }
            }
        };

        loadGroupData();
    }, [groupId, fetchGroupData]);

    // Update messages when currentGroupData changes
    useEffect(() => {
        if (currentGroupData && currentGroupData.messages) {
            const formattedMessages = currentGroupData.messages.map((msg, index) => ({
                id: index + 1,
                text: msg.message,
                sender: msg.sender.name,
                username: msg.sender.username,
                timestamp: formatTimestamp(msg.timestamp),
                isOwn: msg.sender.username === user?.username, // Assuming user object has username
                avatar: getInitials(msg.sender.name)
            }));
            setMessages(formattedMessages);
        }
    }, [currentGroupData, user]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';

        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            // Show time for messages from today
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            // Show date for older messages
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')
            .substring(0, 2);
    };

    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();

        if (!message.trim() || !user) return;

        try {
            // Create the message object to send to API
            const messageData = {
                message: message.trim(),
                groupId: parseInt(groupId)
            };

            // TODO: Replace with your actual API call
            // const response = await sendMessageToGroup(messageData);

            // For now, add message optimistically to UI
            const newMessage = {
                id: messages.length + 1,
                text: message.trim(),
                sender: user.name || user.username,
                username: user.username,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOwn: true,
                avatar: getInitials(user.name || user.username)
            };

            setMessages(prevMessages => [...prevMessages, newMessage]);
            setMessage('');

            // TODO: After successful API call, you might want to refetch group data
            // or handle the response to update the UI with server data

        } catch (error) {
            console.error('Error sending message:', error);
            // Handle error - maybe show a toast notification
        }
    };

    const getAvatarGradient = (name) => {
        const gradients = [
            'from-purple-500 to-pink-500',
            'from-blue-500 to-cyan-500',
            'from-green-500 to-emerald-500',
            'from-orange-500 to-red-500',
            'from-indigo-500 to-purple-500',
            'from-teal-500 to-blue-500'
        ];
        const index = (name ? name.charCodeAt(0) : 0) % gradients.length;
        return gradients[index];
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading chat...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-red-400" />
                    </div>
                    <p className="text-red-400 mb-2">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // No group data state
    if (!currentGroupData) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <div className="text-center">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Chat not found</p>
                </div>
            </div>
        );
    }

    const isDirectMessage = currentGroupData.type === 'direct';
    const chatTitle = currentGroupData.name;
    const onlineCount = currentGroupData.participants?.length || 0;

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            {/* Header */}
            <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors lg:hidden">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg">{chatTitle}</h2>
                        <p className="text-sm text-gray-400">
                            {currentGroupData.totalParticipants} member{currentGroupData.totalParticipants !== 1 ? 's' : ''}
                            {onlineCount > 0 && ` • ${onlineCount} online`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-400">
                            <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg mb-2">No messages yet</p>
                            <p className="text-sm">Start the conversation by sending a message!</p>
                        </div>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex max-w-xs lg:max-w-md xl:max-w-lg ${msg.isOwn ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                                {!msg.isOwn && (
                                    <div className={`w-8 h-8 bg-gradient-to-r ${getAvatarGradient(msg.sender)} rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0`}>
                                        {msg.avatar}
                                    </div>
                                )}

                                <div className={`${msg.isOwn ? 'mr-2' : 'ml-2'}`}>
                                    {!msg.isOwn && !isDirectMessage && (
                                        <p className="text-xs text-gray-400 mb-1 ml-1">{msg.sender}</p>
                                    )}
                                    <div
                                        className={`px-4 py-2 rounded-2xl ${msg.isOwn
                                            ? 'bg-blue-600 text-white rounded-br-md'
                                            : 'bg-gray-700 text-gray-100 rounded-bl-md'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 ml-1">{msg.timestamp}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 bg-gray-800 border-t border-gray-700">
                <div className="flex items-center space-x-3">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
                            placeholder="Type a message..."
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                            maxLength={1000}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-600 rounded-lg transition-colors"
                        >
                            <Smile className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full transition-colors"
                    >
                        <Send className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;