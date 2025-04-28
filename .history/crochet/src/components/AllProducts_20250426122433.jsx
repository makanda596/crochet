import React, { useEffect } from 'react'
import { useAuthStore } from '../utilis/auth'
const AllProducts = () => {
  const { getProducts ,products}= useAuthStore()

  useEffect(()=>{
    getProducts()
    console.log(products)
  },[])
  return (
    <div>

    </div>
  )
}

export default AllProducts