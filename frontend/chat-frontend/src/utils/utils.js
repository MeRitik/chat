export const formatTimestamp = (timestamp) => {
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

export const getAvatarGradient = (name) => {
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