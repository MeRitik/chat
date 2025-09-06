import { useState, useRef, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { Send, Smile, Users, ArrowLeft } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ChatHeader from './ChatHeader';
import { formatTimestamp, getAvatarGradient } from '../utils/utils';
import ChatLoading from './ChatLoading';
import NoChat from './NoChat';
import ChatError from './ChatError';

const ChatInterface = () => {
    const stompClientRef = useRef(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { fetchGroupData, currentGroupData, name, user } = useAuth();

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

    // Connect to WebSocket and subscribe to group topic
    useEffect(() => {
        if (!groupId || !user) return;
        const socket = new SockJS(`${import.meta.env.VITE_BASE_URL}/chat`);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe(`/topic/group/${groupId}`, (msg) => {
                const body = JSON.parse(msg.body);
                // console.log('Received message:', body);
                // console.log(user)

                if (body.sender.username === user) {
                    return;
                }

                setMessages(prev => [
                    ...prev,
                    {
                        id: body.id,
                        text: body.message,
                        sender: body.sender.name,
                        username: body.sender.username,
                        timestamp: formatTimestamp(body.timestamp),
                        isOwn: body.sender.username === user?.username,
                        avatar: getInitials(body.sender.name)
                    }
                ]);
            });
            stompClientRef.current = stompClient;
        });
        return () => {
            stompClient.disconnect();
        };
    }, [groupId, user]);

    // Update messages when currentGroupData changes
    useEffect(() => {
        if (currentGroupData && currentGroupData.messages) {
            const formattedMessages = currentGroupData.messages.map((msg, index) => ({
                id: index + 1,
                text: msg.message,
                sender: msg.sender.name,
                username: msg.sender.username,
                timestamp: formatTimestamp(msg.timestamp),
                isOwn: msg.sender.username === user,
                avatar: getInitials(msg.sender.name)
            }));
            setMessages(formattedMessages);
        }
        // Only run when groupId changes (not on every message/user change)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')
            .substring(0, 2);
    };

    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();
        if (!stompClientRef.current || !message.trim()) return;

        const messageData = {
            sender: { name, username: user },
            group: { name: currentGroupData.name },
            message: message.trim(),
            timestamp: new Date().toISOString()
        };

        // Optimistically add message to UI
        setMessages(prev => [
            ...prev,
            {
                id: prev.length + 1,
                text: messageData.message,
                sender: messageData.sender.name,
                username: messageData.sender.username,
                timestamp: formatTimestamp(messageData.timestamp),
                isOwn: true,
                avatar: getInitials(messageData.sender.name)
            }
        ]);

        stompClientRef.current.send(
            `/app/sendMessage/${groupId}`,
            {},
            JSON.stringify(messageData)
        );
        setMessage('');
    };

    if (loading) {
        return <ChatLoading />;
    }

    if (error) {
        return <ChatError error={error} />;
    }

    if (!currentGroupData) {
        return <NoChat />;
    }

    const isDirectMessage = currentGroupData.type === 'direct';

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            {/* Header */}
            <ChatHeader />
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
                        disabled={!message.trim() || !stompClientRef.current}
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