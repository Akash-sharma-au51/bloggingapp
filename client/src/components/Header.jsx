import React from 'react'
import "./header.css"

const Header = () => {
  return (
    <div>
       <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/register">register</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/contact">Contacts</a></li>
       </ul>
      
    </div>
  )
}

export default Header
