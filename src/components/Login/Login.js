
import "./Login.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../../context/AuthContext';

const Login = () => {

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://cc-learner-backend-1.onrender.com/api/user/login', {
        email,
        password,
      });

      console.log(response.data);
      

      const { token, role,_id } = response.data;

     
      login(token, role,_id);

     
      if (role === 'student') {
        navigate('/student');
      } else if (role === 'mentor') {
        navigate('/mentor');
      } else {
        navigate('/'); 
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login failed, please check your credentials.');
    }
  };
 
    
         


  return (
    <div className='loginContainer'>
        <div className='formContainer'>
            <h3> Login! </h3>
            <form onSubmit={handleLogin}>
                <div className='emailBox'>
                    <label> Email </label>
                    <input  onChange={(e) => setEmail(e.target.value)} value={email}  className='inputBox' type='text'/>
                </div>
                <div className='passwordBox'>
                    <label> Password </label>
                    <input className='inputBox' type='password'  value={password}
          onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='submitBox'>
                    <button className='addButton' type="submit"> Submit </button>
                </div>
                <small> New? <Link to="/register"> <span style={{color:"red"}}> Register </span>
                </Link></small>
            </form>
        </div>
    </div>
  )
}

export default Login