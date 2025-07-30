import React, { useState } from 'react';
import { Users, Search, Plus, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function JoinGroupPage() {
    const [groupName, setGroupName] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const [toast, setToast] = useState(null);

    const navigate = (path) => {
        console.log('Navigate to:', path);
    };

    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3000);
    };

    const checkGroup = async () => {
        if (!groupName.trim()) {
            showToast('error', 'Please enter a group name');
            return;
        }

        setIsChecking(true);
        try {
            const response = await fetch(`/check?group=${encodeURIComponent(groupName.trim())}`);
            const exists = await response.json();

            if (exists) {
                await joinGroup();
            } else {
                showToast('error', 'No group found with this name.');
            }
        } catch (error) {
            console.error(error);
            showToast('error', 'Failed to check group.');
        } finally {
            setIsChecking(false);
        }
    };

    const joinGroup = async () => {
        setIsJoining(true);
        try {
            const response = await fetch(`/join/${encodeURIComponent(groupName.trim())}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                showToast('success', `Joined "${groupName}"`);
                setTimeout(() => navigate('/chats'), 1200);
            } else {
                showToast('error', 'Failed to join group.');
            }
        } catch (error) {
            console.error(error);
            showToast('error', 'Error joining group.');
        } finally {
            setIsJoining(false);
        }
    };

    return (
        <div className="h-full bg-gray-900 text-white p-4 md:p-6 overflow-y-auto">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-5 right-5 z-50 px-4 py-2 rounded-lg text-sm shadow-lg border ${toast.type === 'success'
                    ? 'bg-gray-800 border-green-600 text-green-400'
                    : 'bg-gray-800 border-red-600 text-red-400'
                    }`}>
                    <div className="flex items-center gap-2">
                        {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}

            <div className="max-w-xl mx-auto mt-5 space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="w-14 h-14 bg-gray-800 rounded-full mx-auto flex items-center justify-center border border-gray-700">
                        <Users className="w-6 h-6 text-gray-300" />
                    </div>
                    <h1 className="text-xl font-semibold">Join a Group</h1>
                    <p className="text-sm text-gray-400">Enter the exact name to join an existing group</p>
                </div>

                {/* Form */}
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-300">Group Name</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/3 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input
                                type="text"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && checkGroup()}
                                placeholder="Enter group name"
                                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder-gray-400"
                                disabled={isChecking || isJoining}
                            />
                            <p className="text-xs text-gray-500 mt-1">Case-sensitive match required</p>
                        </div>
                    </div>

                    {/* Join Button */}
                    <button
                        onClick={checkGroup}
                        disabled={isChecking || isJoining || !groupName.trim()}
                        className="w-full py-2 text-sm font-medium rounded-md flex items-center justify-center bg-white text-black hover:bg-gray-200 transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                        {isChecking || isJoining ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                {isChecking ? 'Checking...' : 'Joining...'}
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4 mr-2" />
                                Join Group
                            </>
                        )}
                    </button>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        {
                            icon: <Search className="w-3.5 h-3.5 text-blue-400" />,
                            title: 'Find Groups',
                            desc: 'Search using exact group name.',
                            bg: 'bg-blue-600/20',
                        },
                        {
                            icon: <Users className="w-3.5 h-3.5 text-green-400" />,
                            title: 'Join Instantly',
                            desc: 'Access chats right after joining.',
                            bg: 'bg-green-600/20',
                        },
                    ].map((card, i) => (
                        <div key={i} className="bg-gray-800 p-3 rounded-lg border border-gray-700 space-y-1">
                            <div className="flex items-center gap-2 mb-1">
                                <div className={`w-6 h-6 ${card.bg} rounded flex items-center justify-center`}>
                                    {card.icon}
                                </div>
                                <h3 className="text-sm font-medium">{card.title}</h3>
                            </div>
                            <p className="text-xs text-gray-400">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
