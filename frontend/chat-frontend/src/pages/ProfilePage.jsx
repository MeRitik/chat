import React, { useState } from 'react';
import { Camera, Edit3, Eye, EyeOff, Check, X, Lock, MessageSquare } from 'lucide-react';

export default function ProfilePage() {
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
        status: 'Online',
        totalChats: 142,
    });

    const [editData, setEditData] = useState({
        name: profileData.name,
        username: profileData.username,
    });

    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    const handleSave = (field) => {
        setProfileData((prev) => ({ ...prev, [field]: editData[field] }));
        field === 'name' ? setIsEditingName(false) : setIsEditingUsername(false);
    };

    const handlePasswordUpdate = () => {
        // Add validation or API call here
        setPasswordData({ current: '', new: '', confirm: '' });
        setShowPasswordFields(false);
    };

    return (
        <div className="h-screen overflow-hidden flex">
            <div className="w-full overflow-y-auto p-6 bg-gray-900 text-white">
                <div className="max-w-xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold mb-1">Profile</h1>
                        <p className="text-gray-400 text-sm">Manage your personal info and security</p>
                    </div>

                    {/* Avatar */}
                    <div className="flex justify-center">
                        <div className="relative group">
                            <img
                                src="https://i.pravatar.cc/150?img=3"
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 shadow-md"
                            />
                            <button className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full border border-gray-700 hover:bg-gray-700 transition">
                                <Camera className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
                        {isEditingName ? (
                            <div className="flex gap-2">
                                <input
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    autoFocus
                                />
                                <button onClick={() => handleSave('name')} className="p-2 bg-green-600 rounded-lg">
                                    <Check className="w-4 h-4" />
                                </button>
                                <button onClick={() => { setEditData({ ...editData, name: profileData.name }); setIsEditingName(false); }} className="p-2 bg-gray-600 rounded-lg">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between bg-gray-900 px-4 py-2 rounded-lg">
                                <span>{profileData.name}</span>
                                <button onClick={() => setIsEditingName(true)} className="text-gray-400 hover:text-white">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Username */}
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">Username</label>
                        {isEditingUsername ? (
                            <div className="flex gap-2">
                                <input
                                    value={editData.username}
                                    onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    autoFocus
                                />
                                <button onClick={() => handleSave('username')} className="p-2 bg-green-600 rounded-lg">
                                    <Check className="w-4 h-4" />
                                </button>
                                <button onClick={() => { setEditData({ ...editData, username: profileData.username }); setIsEditingUsername(false); }} className="p-2 bg-gray-600 rounded-lg">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between bg-gray-900 px-4 py-2 rounded-lg">
                                <span>@{profileData.username}</span>
                                <button onClick={() => setIsEditingUsername(true)} className="text-gray-400 hover:text-white">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Password Section */}
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">Password</label>
                        {!showPasswordFields ? (
                            <button
                                onClick={() => setShowPasswordFields(true)}
                                className="w-full bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center justify-between"
                            >
                                <span className="text-white text-sm">Change Password</span>
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
                                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword({ ...showPassword, [field]: !showPassword[field] })
                                            }
                                            className="absolute top-2.5 right-3 text-gray-400"
                                        >
                                            {showPassword[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                ))}
                                <div className="flex gap-2">
                                    <button
                                        onClick={handlePasswordUpdate}
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowPasswordFields(false);
                                            setPasswordData({ current: '', new: '', confirm: '' });
                                        }}
                                        className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-3">
                            <MessageSquare className="w-5 h-5 text-blue-400" />
                            <div>
                                <p className="text-white text-lg font-medium">{profileData.totalChats}</p>
                                <p className="text-xs text-gray-400">Total Chats</p>
                            </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                            <div>
                                <p className="text-white text-sm font-medium">{profileData.status}</p>
                                <p className="text-xs text-gray-400">Status</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
