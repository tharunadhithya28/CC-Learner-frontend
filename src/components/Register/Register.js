import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../Login/Login.css";
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/register', {
        name,
        password,
        email,
        role
      });

      console.log(response);
      const { token, role: userRole , _id} = response.data;

    
      register(token, userRole, _id);

     
      if (userRole === 'student') {
        navigate('/student');
      } else if (userRole === 'mentor') {
        navigate('/mentor');
      } else {
        navigate('/'); 
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert('Registration failed, please check your input.');
    }
  };

  return (
    <div className='loginContainer'>
      <div className='formContainer'>
        <h3>Register!</h3>
        <form onSubmit={handleRegister}>
          <div className='emailBox'>
            <label>Email</label>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              className='inputBox' 
              type='text' 
              value={email} 
              required
            />
          </div>
          <div className='emailBox'>
            <label>Name</label>
            <input 
              onChange={(e) => setName(e.target.value)} 
              className='inputBox' 
              type='text' 
              value={name} 
              required
            />
          </div>
          <div className='passwordBox'>
            <label>Password</label>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              className='inputBox' 
              type='password' 
              value={password} 
              required
            />
          </div>
          <div className='emailBox'>
            <label>Role</label>
            <select 
              onChange={(e) => setRole(e.target.value)} 
              className='inputBox' 
              value={role}
              required
            >
              <option value='student'>Student</option>
              <option value='mentor'>Mentor</option>
            </select>
          </div>
          <div className='submitBox'>
            <button className='addButton' type="submit">Submit</button>
          </div>
          <small>Already have an account? <Link to="/login"><span style={{color:"red"}}>Login</span></Link></small>
        </form>
      </div>
    </div>
  );
}

export default Register;
