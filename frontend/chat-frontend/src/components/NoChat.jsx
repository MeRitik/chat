import React from 'react'

export default function NoChat() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Chat not found</p>
            </div>
        </div>
    );
}
