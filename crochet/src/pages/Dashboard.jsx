import React from 'react'
  import FlashSale from '../components/FlashSale'
import Products from '../components/Products'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Reviews from '../components/Reviews'
import Question from '../components/Question'
const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <FlashSale/>
      <Products/>
      <Question/>
      <Reviews/>
      <Footer/>
    </div>
  )
}

export default Dashboard