
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useEffect} from "react";
import LoadSpinner from './components/LoadSpinner'
import { useAuthStore } from "./utilis/auth.js";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";



const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated} = useAuthStore();

  if (isAuthenticated ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {   
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <LoadSpinner/>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
        <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
