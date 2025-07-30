import { useState, useRef, useEffect } from 'react';
import { Send, Smile, Users, ArrowLeft } from 'lucide-react';

const ChatInterface = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hey everyone! How's the project coming along?",
            sender: "Sarah Wilson",
            timestamp: "10:30 AM",
            isOwn: false,
            avatar: "SW"
        },
        {
            id: 2,
            text: "It's going well! I just finished the authentication module.",
            sender: "You",
            timestamp: "10:32 AM",
            isOwn: true,
            avatar: "JD"
        },
        {
            id: 3,
            text: "That's great! I'm working on the UI components right now. Should have them ready by end of day.",
            sender: "Mike Johnson",
            timestamp: "10:35 AM",
            isOwn: false,
            avatar: "MJ"
        },
        {
            id: 4,
            text: "Perfect timing! I'll integrate them tomorrow morning.",
            sender: "You",
            timestamp: "10:36 AM",
            isOwn: true,
            avatar: "JD"
        },
        {
            id: 5,
            text: "Sounds like we're on track for the demo next week 🎉",
            sender: "Sarah Wilson",
            timestamp: "10:38 AM",
            isOwn: false,
            avatar: "SW"
        },
        {
            id: 6,
            text: "Absolutely! Let's schedule a quick review session tomorrow afternoon to make sure everything is aligned.",
            sender: "Alex Chen",
            timestamp: "10:40 AM",
            isOwn: false,
            avatar: "AC"
        },
        {
            id: 7,
            text: "Good idea! I'll send out a calendar invite shortly.",
            sender: "You",
            timestamp: "10:42 AM",
            isOwn: true,
            avatar: "JD"
        }
    ]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        if (e) e.preventDefault();
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: message,
                sender: "You",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOwn: true,
                avatar: "JD"
            };
            setMessages([...messages, newMessage]);
            setMessage('');
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
        const index = name.charCodeAt(0) % gradients.length;
        return gradients[index];
    };

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
                        <h2 className="font-semibold text-lg">Development Team</h2>
                        <p className="text-sm text-gray-400">4 members • 3 online</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
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
                                {!msg.isOwn && (
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
                ))}
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
                        />
                        <button
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-600 rounded-lg transition-colors"
                        >
                            <Smile className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    <button
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