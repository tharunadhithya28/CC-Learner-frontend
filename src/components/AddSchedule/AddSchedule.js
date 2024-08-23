import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Header from '../Header/Header'
import "./AddSchedule.css"

const AddSchedule = () => {

    const [formData, setFormData] = useState({
        name: '',
        date: '',
        startTime: '',
        endTime: '',
        price : '',
        expertise: ''
      });

      
    
     
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/mentor/', formData);
          console.log('Data submitted successfully:', response.data);
          setFormData({
            name: '',
            date: '',
            startTime: '',
            endTime: '',
            price: '',
            expertise: ''
          });
        } catch (error) {
          console.error('Error submitting data:', error);
        }
      }

  return (
    <div className='scheduleContainer'>
        <header>
            <Header/>
        </header>
        <div className='formMentorContainer'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Name </label>
                    <input type='text'  onChange={handleChange}   name='name' 
              value={formData.name} />
                </div>
                <div>
                    <h2> Availability </h2>
                    <label htmlFor="date">Date:</label>
            <input 
              type="date" 
              id="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              required 
            />
                <label htmlFor="start-time">Start Time:</label>
                    <input type="time" id="start-time"  name="startTime" 
              value={formData.startTime}   onChange={handleChange} />
  
                    <label htmlFor="end-time">End Time:</label>
                    <input type="time" id="end-time"  name="endTime" 
              value={formData.endTime}   onChange={handleChange} />

<label htmlFor="price">Price:</label> 
            <input 
              type="number" 
              id="price" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
              step="0.01"  
            />
                </div>
                   
                <div>
                    <label> Subject for this Session </label>
                    <input type='text'   name='expertise' 
              value={formData.expertise}   onChange={handleChange}  />
                </div>
                <div>
                    <button className='addButton' type='submit'> Add </button>
                </div>
                <div>
                    <Link to="http://localhost:3000/student/availablementors"> <button className='addButton' type='submit'> Scheduled </button> </Link>
                
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddSchedule