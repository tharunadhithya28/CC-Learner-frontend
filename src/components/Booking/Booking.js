import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import { useAuth } from '../../context/AuthContext';
import './Booking.css';

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const{user} = useAuth();
  console.log(user);

  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        
        const response = await axios.get(`https://cc-learner-backend-1.onrender.com/api/booking/student/${user}`);
        console.log(response);
        
        setBookings(response.data); 
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className='bookingPageContainer'>
      <header>
        <Header />
      </header>
      <div className='bookingListContainer'>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className='bookingCard'>
             <p><strong>Booking ID:</strong> {booking._id}</p>
              <p><strong>Mentor Name:</strong> {booking.mentor.name}</p>
              <p><strong>Start Time:</strong> {new Date(booking.startTime).toLocaleString()}</p>
              <p><strong>End Time:</strong> {new Date(booking.endTime).toLocaleString()}</p>
              <p><strong>Price:</strong> ₹{booking.price}</p>
              <p><strong>Status:</strong> Booked </p>
            </div>
          ))
        ) : (
          <p>No bookings available</p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
