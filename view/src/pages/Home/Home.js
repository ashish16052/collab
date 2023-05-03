import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Landing from '../../components/Landing/Landing'
import Features from '../../components/Landing/Features'
import Pricing from '../../components/Landing/Pricing'
import Footer from '../../components/Landing/Footer'
import './Home.scss'

const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <Landing/>
      <Features/>
      <Pricing/>
      <Footer/>
    </div>
  )
}

export default Home