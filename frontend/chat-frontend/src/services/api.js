const API_BASE_URL = 'http://localhost:8080/api/v1';

export async function registerUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Registration error:', error);
    }
}

// export async function checkAvailableGroupName(groupName) {
//     const token = localStorage.getItem('token');
//     console.log('Token being used:', token); // Debug log
    
//     try {
//         const response = await fetch(`${API_BASE_URL}/group/${encodeURIComponent(groupName)}/exists`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//         });

//         // Log the actual request headers
//         console.log('Request headers:', {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         });

//         if (!response.ok) {
//             throw new Error('Server error while checking group name availability');
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Check group name availability error:', error);
//     }
// }