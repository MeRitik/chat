import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const VITE_BASE_URL = "http://localhost:8080";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));

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
            const response = await fetch(`${VITE_BASE_URL}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                toast.error("Login failed. Please check your credentials.");
            }

            const data = await response.json();

            // console.log("Login response:", data);
            setLoading(false);
            const { token, username, name } = data;

            setUser(username);
            setName(name);
            setToken(token);

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(username));
            localStorage.setItem("name", name);
            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setName("");
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    const updateUser = (updatedUserData) => {
        setUser(updatedUserData);
        localStorage.setItem("user", JSON.stringify(updatedUserData));
    };

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
        updateUser,
        isAuthenticated,
        getAuthHeader,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;