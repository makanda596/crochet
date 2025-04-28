import React from "react";
import Navbar from './pages/Navbar.jsx'
import Products from './pages/Product.jsx'
import Testimonials from './pages/Testimonial.jsx'
import Contact from './pages/Contact.jsx'
import Location from './pages/Location.jsx'
import Footer from './pages/Footer.jsx'
import Home from './pages/Home.jsx'
import SpecialOffer from './pages/SpecialOffer.jsx'
import Services from './pages/Services.jsx'
const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Products />
      <SpecialOffer />

      <Services />
      <Testimonials />
      <Contact />
      <Location />
      <Footer />

    </div>
  );
};

export default App;

