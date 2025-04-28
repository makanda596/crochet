import {create} from 'zustand'
import axios from 'axios'
export const userAuthStore = create((set)=>({
    admin:null,
    error:"",

    login:async (username,password)=>{
        try{
        const response = await axios.post('http://localhost:5000/admin/login',{username,password})
        set({admin:response.data.admin})
    }catch(error){
    set({error:error.message})
    }
    }

}))