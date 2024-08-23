import React from 'react'
import "./Header.css"
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SiStudyverse } from "react-icons/si";
import {Link} from "react-router-dom"

const Header = () => {

  const { isAuthenticated, logout, userRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (

    <div className='headerContainer'> 
    <Link  to={userRole === 'student' ? "http://localhost:3000/student" : "http://localhost:3000/mentor"} > 
    <div className='titleDesign'>
          <div>
          <SiStudyverse size="30px"/>
          </div>
          <div>
          <h2 style={{marginLeft:"15px"}} className='link'> CC Learner </h2>
          </div>
           
        </div>
    </Link>
      
        <div>
            {isAuthenticated ? (
          <>
            <button className='regButton' onClick={() => navigate('/booking')}>Bookings</button>
            <button className='regButton' onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className='regButton' onClick={() => navigate('/login')}>Login</button>
            <button className='regButton' onClick={() => navigate('/register')}>Register</button>
          </>)}
        </div>
    </div>

  )
}

export default Header