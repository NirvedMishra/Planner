import { useState } from 'react'
import '../App.css'

function Title(props) {
  

  return (
    <>
    
      <div className="container" style={{
        
        width: "fit-content",
        padding:"10px 20px",
        borderTopLeftRadius:"22px",
        borderBottomRightRadius:"22px",
        color: "white",
    backgroundImage: "linear-gradient(to right, #3D8144 , #72DB7C)"
      }}>
        <p style={{fontSize:"22px"}}>{props.title}</p>
      </div>
    </>
  )
}

export default Title
