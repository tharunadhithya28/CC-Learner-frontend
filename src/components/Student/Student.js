import React from 'react'
import {Link} from "react-router-dom"
import Header from '../Header/Header'
import "../MentorPage/MentorPage.css"

const Student = () => {
    
  return (
    <div className='mentorPageContainer'>
        <header>
            <Header/>
        </header>
        <div className='mentorPageLayout'>
            <h1 className='mentorPageTitle'> Welcome Student! </h1>
            <div className='layoutContainer'>
                <div>
                <h2> Empower your learning journey with personalized mentorship—connect, book, and excel with our expert mentors.</h2>
                    <h2> Want to Schedule a session with Mentor? </h2>
                    <div>
                        <Link to="/student/availablementors"> <button className='addButton'> Book a Session </button> </Link>
                    </div>
                    
                </div>
                <div>
                <img width="700px" src='https://img.freepik.com/free-photo/beautiful-young-woman-colorful-jacket-using-smartphone_140725-13019.jpg?t=st=1724325463~exp=1724329063~hmac=d10cca1fbc71219d47166c939619d682152632dc42b560ca0d9f7d304b8a62e2&w=1380'/>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default Student 