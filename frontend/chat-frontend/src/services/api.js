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