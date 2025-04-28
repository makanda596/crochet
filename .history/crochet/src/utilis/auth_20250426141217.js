import {create} from 'zustand'
import axios from 'axios'
export const useAuthStore = create((set)=>({
    admin: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    message: null,
    isCheckingAuth: true,
    products:[],
    flashsales:[],
    orders:[],

    login:async (username,password)=>{
        try{
            const response = await axios.post('http://localhost:5000/admin/login',{username,password})
            localStorage.setItem("token", response.data.token);
            set({ admin: response.data.admin, isAuthenticated: true, isLoading: false, error: null })
    }catch(error){
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
    }
    },
    // logout: async () => {
    //     try {
    //         await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/logout`, null, { withCredentials: true });
    //         localStorage.removeItem("token");
    //         set({ user: null, isAuthenticated: false, isCheckingAuth: false });
    //     } catch (error) {
    //         set({ error: error.response?.data?.message || "Error logging out", isLoading: false });
    //         throw error;
    //     }
    // },
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const token = localStorage.getItem("token")
            if (!token) {
                set({ isAuthenticated: false, isCheckingAuth: false });
                return;
            }

            const response = await axios.get('http://localhost:5000/admin/check-auth', {
                headers:{Authorization:`Bearer ${token}`},
                withCredentials: true
            });

            set({
            admin: response.data.admin,
                isAuthenticated: response.data.admin,
              isCheckingAuth: false
            });

          
        } catch (error) {
            localStorage.removeItem("token");
            set({
                isAuthenticated: false,
                isCheckingAuth: false,
                error: error.response?.data?.message || "Failed to authenticate",
            });
        }
    },
    getProducts: async () => {
        try {
            set({ loading: true, error: null });
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No authentication token found");
            }

            const response = await axios.get('http://localhost:5000/products/allproducts', {
                headers: { Authorization: `Bearer ${token}` } // Add space after Bearer
            });

            set({ products: response.data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || error.message || "Failed to fetch products",
                loading: false
            });
        }
    },
    getflashsales: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axios.get('http://localhost:5000/products/allflashsales');

            set({ flashsales: response.data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || error.message || "Failed to fetch products",
                loading: false
            });
        }
    },
    getOrders: async () => {
        try {
            set({ loading: true });
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:5000/orders/getorders', {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ orders: response.data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Failed to load orders",
                loading: false
            });
        }
    },
}))