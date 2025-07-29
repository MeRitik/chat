import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/" element={<RequireAuth><ChatLayout /></RequireAuth>}> */}
          {/* <Route index element={<JoinChatPage />} /> */}
          {/* <Route path="chat/:groupname" element={<ChatPage />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
