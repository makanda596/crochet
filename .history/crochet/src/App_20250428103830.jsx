
import { useEffect} from "react";
import LoadSpinner from './components/LoadSpinner'
import { useAuthStore } from "./utilis/auth.js";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Order from "./pages/Order.jsx";
import Oneproduct from "./components/Oneproduct.jsx";
import Contact from "./pages/Contact.jsx";
import Enquiry from "./pages/Enquiry.jsx";
import Flash from "./pages/Flash.jsx";
import OneFlash from "./pages/OneFlash.jsx";



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
        <Route path='/Oneproduct/:productId' element={<Oneproduct />} />
        <Route path='/OneFlash/:productId' element={<OneFlash/>}/>
        <Route path='/contact' element={<Contact />} />
        <Route path='/flashSales' element={<Flash />} />
        <Route path='/enquiry' element={<Enquiry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 