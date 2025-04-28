import {create} from 'zustand'
import axios from 'axios'
export const useAuthStore = create((set)=>({
    admin: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    message: null,
    isCheckingAuth: true,

    login:async (username,password)=>{
        try{
            const response = await axios.post(`import.meta.env.VITE_BACKEND_URL/admin/login`,{username,password})
            set({ admin: response.data.admin, isAuthenticated: true, isLoading: false, error: null })
    }catch(error){
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
    }
    },
    logout: async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/logout`, null, { withCredentials: true });
            localStorage.removeItem("token");
            set({ user: null, isAuthenticated: false, isCheckingAuth: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging out", isLoading: false });
            throw error;
        }
    },

}))