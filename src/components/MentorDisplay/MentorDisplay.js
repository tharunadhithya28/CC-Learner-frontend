import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import { useAuth } from '../../context/AuthContext';
import './MentorDisplay.css';

const MentorDisplay = () => {
  const [mentors, setMentors] = useState([]);
  const { user, userRole } = useAuth();

  

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/mentor/');
        console.log(response.data);
        
        const availableMentors = response.data.filter(mentor => !mentor.isBooked);
        setMentors(availableMentors);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };
    fetchMentors();
  }, []);

  const handleBook = async (mentor) => {
    try {
      console.log("before booking data");

      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    let formattedDate = mentor.date;


    if (!datePattern.test(mentor.date)) {
      const dateObj = new Date(mentor.date);
      formattedDate = dateObj.toISOString().split('T')[0]; 
      console.log("Formatted date:", formattedDate); 
    }

   
    const startTimeStr = `${formattedDate}T${mentor.startTime}:00`; 
    const endTimeStr = `${formattedDate}T${mentor.endTime}:00`;

    console.log("startTimeStr:", startTimeStr); 
    console.log("endTimeStr:", endTimeStr); 
    const adjustToUTC = (date) => {
      const offset = date.getTimezoneOffset() * 60000; 
      return new Date(date.getTime() - offset); 
    };
    

  

    const startTime = adjustToUTC(new Date(startTimeStr));
const endTime = adjustToUTC(new Date(endTimeStr));

    console.log("startTime:", startTime); 
    console.log("endTime:", endTime); 

   
    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      throw new Error('Invalid date or time');
    }


    
      
    
      const studentId = user
      const bookingData = {
        student: studentId,
        mentor: mentor._id,
        startTime,
        endTime,
        price: mentor.price,
      };
      

      console.log("after booking data");
      

      await axios.post('http://localhost:5000/api/booking', bookingData);
      setMentors(prevMentors => prevMentors.filter(m => m._id !== mentor._id));

      console.log("after axios");
      
      
     
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Booking failed, please try again.');
    }
  };


  return (
    <div className='mentorPageContainer'>
      <header>
        <Header />
      </header>
      <div className='mentorListContainer'>
        {mentors.length > 0 ? (
          mentors.map((mentor, index) => (
            <div key={index} className='mentorCard'>
              <h3>{mentor.name}</h3>
              <p><strong>Date:</strong> {mentor.date}</p>
              <p><strong>Availability:</strong> {mentor.startTime} - {mentor.endTime}</p>
              <p><strong>Expertise:</strong> {mentor.expertise}</p>
              <p><strong>Price:</strong> Rs.{mentor.price}</p>
              {userRole === 'student' && (
                <button 
                className='bookButton' 
                onClick={() => handleBook(mentor)} 
              >
                Book
              </button>
              )}
            </div>
          ))
        ) : (
          <p>No mentors available</p>
        )}
      </div>
    </div>
  );
};

export default MentorDisplay;

