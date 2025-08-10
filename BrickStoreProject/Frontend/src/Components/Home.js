import React from 'react'
import Navbar from './Navbar'
import Slides from './Slides'
import Category from './Category';
import Section1 from './Section1';
// import Section2 from './Section2';
import Footer from './Footer';

function Home() {
  return (
    <div>
      <Slides/>
      <Category/>
     
      <Section1/>
      <Footer/>
    </div>
  )
}

export default Home;