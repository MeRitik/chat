import { createContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const VITE_BASE_URL = "http://localhost:8080/api/v1";

const api = axios.create({
    baseURL: VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        setName("");
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
    }, []);

    useEffect(() => {
        // Request interceptor to add token to requests
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    // Token is invalid or expired
                    logout();
                    toast.error("Session expired. Please login again.");
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [token, logout]);

    // Check if user is authenticated on component mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            const storedToken = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");
            const storedName = localStorage.getItem("name");

            if (storedToken && storedUser && storedName) {
                try {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                    setName(storedName);
                } catch (error) {
                    console.error("Error parsing stored user data:", error);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    localStorage.removeItem("name");
                }
            }
            setLoading(false);
        };

        checkAuthStatus();
    }, []);

    const login = async (userData) => {
        setLoading(true);
        try {
            const response = await api.post('/auth/login', userData);
            const data = response.data;
            const { token, username, name } = data;

            setUser(username);
            setName(name);
            setToken(token);

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(username));
            localStorage.setItem("name", name);

            toast.success(`Welcome back, ${name}!`);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Login failed. Please check your credentials.";
            toast.error("Login error: " + errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const checkAvailableGroupName = async (groupName) => {
        try {
            const response = await api.get(`/group/${encodeURIComponent(groupName)}/exists`);
            return response.data;
        } catch (error) {
            console.error('Check group name availability error:', error);
            const errorMessage = error.response?.data?.message || "Failed to check group name availability";
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }
    };

    async function registerUser(userData) {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            console.error('Registration error:', error.message);
            throw error;
        }
    }

    async function joinGroup(groupName) {
        try {
            const response = await api.post('/groups/user', {
                username: user,
                groupName
            });

            return response.data;
        } catch (error) {
            toast.error(error);
            throw error;
        }
    }

    async function getUserDetails() {
        try {
            const response = await api.get(`/profile/${user}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        }
    }

    const isAuthenticated = () => !!user && !!token;

    const getAuthHeader = () => {
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const value = {
        user,
        name,
        token,
        loading,
        login,
        logout,
        isAuthenticated,
        getAuthHeader,
        checkAvailableGroupName,
        registerUser,
        joinGroup,
        getUserDetails,
        api,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;