import {create} from 'zustand'
import axios from 'axios'
export const userAuthStore = create((set)=>({
    admin: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    message: null,
    isCheckingAuth: true,

    login:async (username,password)=>{
        try{
        const response = await axios.post('http://localhost:5000/admin/login',{username,password})
            set({ admin: response.data.admin, isAuthenticated: true, isLoading: false, error: null })
    }catch(error){
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
    }
    }

}))