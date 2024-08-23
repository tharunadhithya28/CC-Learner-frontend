import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Home from './components/HomePage/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import MentorPage from './components/MentorPage/MentorPage';
import Student from './components/Student/Student';
import MentorDisplay from './components/MentorDisplay/MentorDisplay';
import AddSchedule from './components/AddSchedule/AddSchedule';
import Payment from './components/Payment/Payment';
import BookingPage from './components/Booking/Booking';

function App() {
  return (
    <AuthProvider>
       <Router>
      <Routes>
      <Route path="/" element={ <Home /> }/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mentor" element={<MentorPage />} />
      <Route path="/mentor/addschedule" element={<AddSchedule />} />
      <Route path="/student" element={<Student />} />
      <Route path="/student/availablementors" element={<MentorDisplay />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/booking" element={<BookingPage/>} />
    </Routes>
    </Router>

    </AuthProvider>
   
    
  );
}

export default App;
