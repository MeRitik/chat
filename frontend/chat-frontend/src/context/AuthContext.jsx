import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ name: "Ritik", username: "ritik" });
    // const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Check if user is authenticated on component mount
    // useEffect(() => {
    //     const checkAuthStatus = async () => {
    //         const storedToken = localStorage.getItem("token");
    //         const storedUser = localStorage.getItem("user");

    //         if (storedToken && storedUser) {
    //             try {
    //                 setToken(storedToken);
    //                 setUser(JSON.parse(storedUser));
    //             } catch (error) {
    //                 console.error("Error parsing stored user data:", error);
    //                 localStorage.removeItem("token");
    //                 localStorage.removeItem("user");
    //             }
    //         }
    //         setLoading(false);
    //     };

    //     checkAuthStatus();
    // }, []);

    // const login = async (userData, authToken) => {
    //     try {
    //         setUser(userData);
    //         setToken(authToken);
    //         localStorage.setItem("token", authToken);
    //         localStorage.setItem("user", JSON.stringify(userData));
    //         return { success: true };
    //     } catch (error) {
    //         console.error("Login error:", error);
    //         return { success: false, error: error.message };
    //     }
    // };

    // const logout = () => {
    //     setUser(null);
    //     setToken(null);
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user");
    // };

    // const updateUser = (updatedUserData) => {
    //     setUser(updatedUserData);
    //     localStorage.setItem("user", JSON.stringify(updatedUserData));
    // };

    // const isAuthenticated = () => {
    //     return !!user && !!token;
    // };

    const isAuthenticated = true;

    // const getAuthHeader = () => {
    //     return token ? { Authorization: `Bearer ${token}` } : {};
    // };

    const value = {
        user,
        token,
        // loading,
        // login,
        // logout,
        // updateUser,
        isAuthenticated,
        // getAuthHeader,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;