import React from 'react';
import bookimg from "../Images/Bookimg.png";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../Other/UserContext'; // Adjust import path as needed

const Header = () => {
  const { name } = useUser();
  const navigate = useNavigate();
  var url;
  console.log("Header Name:", name); // Debug log
  if(name==="Farhan"){
    url="/admin";
  }
  else{
    url="/";
  }

  return (
    <>
      <nav className="header">
        <img src={bookimg} alt="logo" onClick={() => { navigate("/") }} />
        <h1>BookHub</h1>
        <div>
          <Link id='if'>{name}</Link>
          {
           name===null ||name === ""? <Link to="/login">LogIn</Link>: <Link to="/logout">LogOut</Link>
          } 
          <Link to="/about">About</Link>
          <Link to={url}>Home</Link>  
        </div>
      </nav>
    </>
  );
};

export default Header;
