import React from 'react'
import {Link} from "react-router-dom"
import Header from '../Header/Header'
import "./MentorPage.css"

const MentorPage = () => {
  return (
    <div className='mentorPageContainer'>
        <header>
            <Header/>
        </header>
        <div className='mentorPageLayout'>
            <h1 className='mentorPageTitle'> Welcome Mentor! </h1>
            <div className='layoutContainer'>
                <div>
                    <img width="700px" src='https://img.freepik.com/premium-photo/woman-sits-stack-books-with-laptop-her-lap_987694-26264.jpg?w=826'/>
                </div>
                <div>
                    <h2> Share your expertise and guide eager learners—create impactful connections and inspire success through our mentoring platform.</h2>
                    <h2> Available to teach a student? Add your Availability here </h2>
                    <div>
                        <Link to="http://localhost:3000/mentor/addschedule">
                        <button className='addButton'> Add a Schedule  </button>
                        </Link>
                       
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default MentorPage