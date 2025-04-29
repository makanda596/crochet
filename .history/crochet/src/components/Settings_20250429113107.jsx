import React, { useEffect } from 'react'
import { useAuthStore } from '../utilis/auth'

const Settings = () => {
  const{profile,admin}= useAuthStore()
  const fetchProfile=async()=>{
    await profile
  }

  useEffect(()=>{
    fetchProfile()
  },[])
  return (
    <div>{admin.username}</div>
  )
}

export default Settings 