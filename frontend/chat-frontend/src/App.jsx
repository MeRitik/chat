import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from "./pages/LoginPage";
import RequireAuth from "./routes/RequireAuth";
import Index from "./pages/Index";

import ProfilePage from "./pages/ProfilePage";
import JoinGroupPage from "./pages/JoinGroupPage";
import ChatsListPage from "./pages/ChatsListPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <RequireAuth>
                <Index />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="/chats" replace />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="groups" element={<JoinGroupPage />} />
            <Route path="chats" element={<ChatsListPage />} />
            <Route path="chats/:chatId" element={<ChatsListPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App