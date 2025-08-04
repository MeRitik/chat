import React, { useContext, useEffect, useState } from 'react';
import { Camera, Edit3, Eye, EyeOff, Check, X, Lock, MessageSquare, Loader2 } from 'lucide-react';
import AuthContext from '../context/AuthContext';

export default function ProfilePage() {
    const { getUserDetails } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        username: 'johndoe',
        totalChats: 42,
        status: 'Online',
        // Add more fields if needed
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getUserDetails();
                setProfileData(response);
            } catch (error) {
                console.error("Failed to fetch user details:", error);
                // Handle error state or set default data
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [getUserDetails]);

    const [editData, setEditData] = useState({
        name: profileData?.name || '',
        username: profileData?.username || '',
    });

    useEffect(() => {
        // Sync editData with profileData after it's fetched
        if (profileData) {
            setEditData({
                name: profileData.name,
                username: profileData.username,
            });
        }
    }, [profileData]);

    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    const handleSave = (field) => {
        // Add API call to save data here
        setProfileData((prev) => ({ ...prev, [field]: editData[field] }));
        field === 'name' ? setIsEditingName(false) : setIsEditingUsername(false);
    };

    const handlePasswordUpdate = () => {
        // Add validation or API call here
        setPasswordData({ current: '', new: '', confirm: '' });
        setShowPasswordFields(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-950">
                <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
            </div>
        );
    }

    return (
        <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-900 text-gray-200">
            <div className="w-full max-w-xl p-8 bg-gray-900 rounded-2xl shadow-xl border border-gray-800 animate-fade-in mx-4">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white tracking-wide">Profile</h1>
                        <p className="text-gray-400 mt-2 text-sm">Manage your personal info and security</p>
                    </div>

                    {/* Avatar */}
                    <div className="flex justify-center">
                        <div className="relative group">
                            <img
                                src="https://i.pravatar.cc/150?img=3"
                                alt="Profile"
                                className="w-28 h-28 rounded-full object-cover border-4 border-gray-800 shadow-md transition-transform duration-300 transform group-hover:scale-105"
                            />
                            <button className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full border border-gray-700 hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 transform group-hover:-translate-y-1">
                                <Camera className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Personal Info Section */}
                    <div className="space-y-6">
                        {/* Name */}
                        <div className="bg-gray-800 rounded-lg p-4 transition-colors duration-200 hover:bg-gray-700">
                            <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
                            {isEditingName ? (
                                <div className="flex gap-2">
                                    <input
                                        value={editData.name}
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        autoFocus
                                    />
                                    <button onClick={() => handleSave('name')} className="p-2 bg-green-600 rounded-lg hover:bg-green-700 transition">
                                        <Check className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => { setEditData({ ...editData, name: profileData.name }); setIsEditingName(false); }} className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-medium">{profileData.name}</span>
                                    <button onClick={() => setIsEditingName(true)} className="text-gray-400 hover:text-blue-400 transition">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Username */}
                        <div className="bg-gray-800 rounded-lg p-4 transition-colors duration-200 hover:bg-gray-700">
                            <label className="text-sm text-gray-400 mb-1 block">Username</label>
                            {isEditingUsername ? (
                                <div className="flex gap-2">
                                    <input
                                        value={editData.username}
                                        onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        autoFocus
                                    />
                                    <button onClick={() => handleSave('username')} className="p-2 bg-green-600 rounded-lg hover:bg-green-700 transition">
                                        <Check className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => { setEditData({ ...editData, username: profileData.username }); setIsEditingUsername(false); }} className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-medium">@{profileData.username}</span>
                                    <button onClick={() => setIsEditingUsername(true)} className="text-gray-400 hover:text-blue-400 transition">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="bg-gray-800 rounded-2xl p-4 shadow-inner border border-gray-700">
                        <label className="text-sm text-gray-400 mb-2 block">Password</label>
                        {!showPasswordFields ? (
                            <button
                                onClick={() => setShowPasswordFields(true)}
                                className="w-full bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg flex items-center justify-between transition-colors duration-200"
                            >
                                <span className="font-medium">Change Password</span>
                                <Lock className="w-4 h-4 text-gray-400" />
                            </button>
                        ) : (
                            <div className="space-y-3">
                                {['current', 'new', 'confirm'].map((field) => (
                                    <div key={field} className="relative">
                                        <input
                                            type={showPassword[field] ? 'text' : 'password'}
                                            placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} password`}
                                            value={passwordData[field]}
                                            onChange={(e) => setPasswordData({ ...passwordData, [field]: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword({ ...showPassword, [field]: !showPassword[field] })}
                                            className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 hover:text-white"
                                        >
                                            {showPassword[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                ))}
                                <div className="flex gap-2">
                                    <button
                                        onClick={handlePasswordUpdate}
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowPasswordFields(false);
                                            setPasswordData({ current: '', new: '', confirm: '' });
                                        }}
                                        className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl shadow-md flex items-center gap-4 border border-gray-700">
                            <div className="p-3 rounded-full bg-blue-600/20 text-blue-400">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-white text-xl font-bold">{profileData.totalChats}</p>
                                <p className="text-xs text-gray-400">Total Chats</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl shadow-md flex items-center gap-4 border border-gray-700">
                            <div className="p-3 rounded-full bg-green-600/20 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                            </div>
                            <div>
                                <p className="text-white text-xl font-bold capitalize">{profileData.status}</p>
                                <p className="text-xs text-gray-400">Status</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
