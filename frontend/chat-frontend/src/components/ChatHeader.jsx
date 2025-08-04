import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { ArrowLeft, Users } from 'lucide-react';

export default function ChatHeader() {

    const { currentGroupData } = useAuth();
    const chatTitle = currentGroupData.name;

    return (
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
                    </p>
                </div>
            </div>
        </div>
    )
}
