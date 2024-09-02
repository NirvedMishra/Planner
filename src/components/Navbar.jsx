import { useState } from 'react'
import '../App.css'
import './Navbar.css'
function Navbar() {
  

  return (
    <>
      <nav>
        <div className="logo">
            <h1>Planner</h1>
        </div>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Projects</a></li>
            <li><a href="/">Progress</a></li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
