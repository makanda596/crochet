import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoadSpinner from './components/LoadSpinner';
import { useAuthStore } from "./utilis/auth.js";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Order from "./pages/Order.jsx";
import Oneproduct from "./components/Oneproduct.jsx";
import Contact from "./pages/Contact.jsx";
import Enquiry from "./pages/Enquiry.jsx";
import Flash from "./pages/Flash.jsx";
import OneFlash from "./pages/OneFlash.jsx";
import Product from './pages/Product'
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadSpinner />;

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/order/:id" element={<ProtectedRoute><Order /></ProtectedRoute>} />
        <Route path="/Oneproduct/:productId" element={<Oneproduct />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/OneFlash/:productId" element={<OneFlash />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/flashSales" element={<Flash />} />
        <Route path="/enquiry" element={<Enquiry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
