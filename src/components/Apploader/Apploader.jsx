import React from 'react'
import './Apploader.css'
import logo from '../../assets/transparent_logo.png'

const Apploader = () => {
  return (
     <div className="app-loader">
      <div className="app-logo">
        <img src={logo} alt="" />
      </div>
      <div className="loader-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default Apploader