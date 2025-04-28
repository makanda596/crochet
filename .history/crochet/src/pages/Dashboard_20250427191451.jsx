import React from 'react'
  import FlashSale from '../components/FlashSale'
import Products from '../components/Products'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Reviews from '../components/Reviews'
const Dashboard = () => {
  return (
    <div>
      {/* <Navbar/> */}
      <FlashSale/>
      <Products/>
      <Reviews/>
      <Footer/>
    </div>
  )
}

export default Dashboard