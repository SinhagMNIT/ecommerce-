import React from 'react'
import './Navbar.css'
import navbarlogo from '../../assets/nav-logo.svg'
import navprofileicon from '../../assets/nav-profile.svg'
const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='navlogo' src={navbarlogo} alt="" />
        <img src={navprofileicon} className='navprofile' alt="" />
    </div>
  )
}

export default Navbar