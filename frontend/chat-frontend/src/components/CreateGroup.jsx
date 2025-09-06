import React, { useState, useEffect, useRef, useContext } from 'react';
import { Users, CheckCircle, XCircle, Loader2, Shield, Plus } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function CreateGroupPage() {
    const [groupName, setGroupName] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [availabilityStatus, setAvailabilityStatus] = useState(null); // null, 'checking', 'available', 'taken'
    const debounceTimeoutRef = useRef(null);

    const { checkAvailableGroupName, api, user } = useContext(AuthContext);

    // Debounced availability check
    const checkAvailability = async (name) => {
        if (name.length < 3) {
            setAvailabilityStatus(null);
            return;
        }
        setIsChecking(true);
        setAvailabilityStatus('checking');
        try {
            const data = await checkAvailableGroupName(name);
            console.log(data)
            setAvailabilityStatus(data.exists === true ? 'taken' : 'available');
        } catch (error) {
            console.error('Availability check failed:', error);
            setAvailabilityStatus(null);
        }
        setIsChecking(false);
    };

    const handleGroupNameChange = (e) => {
        const value = e.target.value;
        setGroupName(value);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        if (value.trim().length >= 3) {
            debounceTimeoutRef.current = setTimeout(() => {
                checkAvailability(value.trim());
            }, 500); // 500ms debounce
        } else {
            setAvailabilityStatus(null);
        }
    };

    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);

    const handleCreateButton = async () => {
        try {
            const data = await checkAvailableGroupName(groupName);
            if (data.exists) {
                toast.error("Group name is already taken. Please choose another.");
                return;
            }

            const response = await api.post(`/user/${user}/group`, { name: groupName });

            if (response.data.name == groupName) {
                toast.success(`Group Created with name: ${groupName}`);
            }

        } catch (error) {
            console.error('Availability check failed:', error);
            setAvailabilityStatus(null);
        }
    };

    return (
        <div className="h-full bg-gray-900 text-white p-4 md:p-6 overflow-y-auto">
            <div className="max-w-xl mx-auto mt-5 space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="w-14 h-14 bg-gray-800 rounded-full mx-auto flex items-center justify-center border border-gray-700">
                        <Users className="w-6 h-6 text-gray-300" />
                    </div>
                    <h1 className="text-xl font-semibold">Create a Group</h1>
                    <p className="text-sm text-gray-400">Check if the group name is available</p>
                </div>

                {/* Form */}
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-300">Group Name</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-1/3 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            <input
                                type="text"
                                value={groupName}
                                onChange={handleGroupNameChange}
                                placeholder="Enter group name"
                                className="w-full pl-9 pr-10 py-2 text-sm bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder-gray-400"
                                disabled={isChecking}
                                maxLength={50}
                            />
                            {/* Availability indicator */}
                            {groupName.length >= 3 && (
                                <div className="absolute right-4 top-5 -translate-y-1/2">
                                    {availabilityStatus === 'checking' && (
                                        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                    )}
                                    {availabilityStatus === 'available' && (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    )}
                                    {availabilityStatus === 'taken' && (
                                        <XCircle className="w-4 h-4  text-red-500" />
                                    )}
                                </div>
                            )}
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-xs text-gray-500">3-50 characters, must be unique</p>
                                {groupName.length >= 3 && availabilityStatus && (
                                    <p className={`text-xs ${availabilityStatus === 'available' ? 'text-green-500' :
                                        availabilityStatus === 'taken' ? 'text-red-500' :
                                            'text-gray-400'
                                        }`}>
                                        {availabilityStatus === 'checking' && 'Checking...'}
                                        {availabilityStatus === 'available' && 'Available!'}
                                        {availabilityStatus === 'taken' && 'Unavailable'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Create Button */}
                    <button
                        onClick={handleCreateButton}
                        disabled={isChecking || !groupName.trim()}
                        className="w-full py-2 text-sm font-medium rounded-md flex items-center justify-center bg-white text-black hover:bg-gray-200 transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                        {isChecking ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Checking...
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4 mr-2" />
                                Create Group
                            </>
                        )}
                    </button>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        {
                            icon: <Shield className="w-3.5 h-3.5 text-blue-400" />,
                            title: 'Unique Names',
                            desc: 'Each group needs a unique name.',
                            bg: 'bg-blue-600/20',
                        },
                        {
                            icon: <CheckCircle className="w-3.5 h-3.5 text-green-400" />,
                            title: 'Real-time Check',
                            desc: 'Availability checked in real-time.',
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