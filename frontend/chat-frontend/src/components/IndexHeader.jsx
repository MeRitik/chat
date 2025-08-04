import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function IndexHeader({ isShrunk }) {
    return (
        <div className={`
            p-6 border-b border-gray-700 bg-gradient-to-r
            from-gray-800 to-gray-900 shadow-lg
            transition-all duration-300 ease-in-out
            ${isShrunk ? 'flex justify-center pb-8' : ''}
        `}>
            <div className={`
                flex items-center 
                ${isShrunk ? 'justify-center' : 'gap-4'}
            `}>
                <div className={`
                    bg-gray-700 rounded-xl flex items-center justify-center border border-gray-600
                    transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-gray-500
                    ${isShrunk ? 'w-10 h-10' : 'w-12 h-12'}
                `}>
                    <MessageCircle className={`
                        text-gray-300
                        ${isShrunk ? 'w-5 h-5' : 'w-6 h-6'}
                    `} />
                </div>
                {!isShrunk && (
                    <div className="flex flex-col overflow-hidden">
                        <h1 className="text-xl font-bold text-white tracking-tight whitespace-nowrap">ChatFlow</h1>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <p className="text-sm text-gray-400 whitespace-nowrap">Connected</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}