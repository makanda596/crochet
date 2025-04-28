import React from 'react'
  import FlashSale from '../components/FlashSale'
import Products from '../components/Products'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <FlashSale/>
      <Products/>
      <Footer/>
    </div>
  )
}

export default Dashboard