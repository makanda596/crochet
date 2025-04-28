
import { useEffect} from "react";
import LoadSpinner from './components/LoadSpinner'
import { useAuthStore } from "./utilis/auth.js";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Order from "./pages/Order.jsx";
import Oneproduct from "./components/Oneproduct.jsx";



const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated} = useAuthStore();

  if (isAuthenticated ) {
    return <Navigate to="/home" replace />;
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
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/' element={<Dashboard/>} />
        <Route path="/order/:id" element={<ProtectedRoute><Order /></ProtectedRoute>} />
        <Route path='/Oneproduct/:id' element={<Oneproduct/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 