import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import { useAuth } from '../../context/AuthContext';
import './MentorDisplay.css';

const MentorDisplay = () => {
  const [mentors, setMentors] = useState([]);
  const { user, userRole } = useAuth();

  

  // Fetch mentors from the backend
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

    // If date is not in YYYY-MM-DD format, try to correct it
    if (!datePattern.test(mentor.date)) {
      const dateObj = new Date(mentor.date);
      formattedDate = dateObj.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
      console.log("Formatted date:", formattedDate); // Log formatted date
    }

    // Combine date and time to create valid ISO date-time strings
    const startTimeStr = `${formattedDate}T${mentor.startTime}:00`; // Adding ":00" for seconds
    const endTimeStr = `${formattedDate}T${mentor.endTime}:00`;

    console.log("startTimeStr:", startTimeStr); // Log startTimeStr
    console.log("endTimeStr:", endTimeStr); // Log endTimeStr

    const adjustToUTC = (date) => {
      const offset = date.getTimezoneOffset() * 60000; // Get offset in milliseconds
      return new Date(date.getTime() - offset); // Adjust date to UTC
    };
    

  

    const startTime = adjustToUTC(new Date(startTimeStr));
const endTime = adjustToUTC(new Date(endTimeStr));

    console.log("startTime:", startTime); // Log startTime
    console.log("endTime:", endTime); // Log endTime

    // Check if the date construction fails
    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      throw new Error('Invalid date or time');
    }


    
      
      // Replace with actual student ID
      const studentId = user// You need to get the actual student ID from context or state
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
      
      
      // window.location.href = '/payment'; // Navigate to the payment page
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
                onClick={() => handleBook(mentor)} // Pass the mentor ID to the payment page
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

