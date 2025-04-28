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
    getProducts:async()=>{
        try{
            const token = localStorage.getItem("token")
            const response = await axios.get('http://localhost:5000/products/allproducts',{
                headers:{Authorization:`Bearer${token}`}
            })
            set({products:response.data.products})
        }catch(error){
                        set({ error: error.response?.data?.message || "Failed to authenticate", })
        }
    }

}))