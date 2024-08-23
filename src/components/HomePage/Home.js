import React from 'react'
import Header from '../Header/Header'
import "./Home.css"

const Home = () => {
  return (
    <div className='homeContainer'>
        <header>
            <Header/>
        </header> 
    <div className='layoutContainer'>
        <div className='layoutTextContainer'>
            <h3 width="250px"> Connecting students with expert mentors for personalized learning and growth.</h3>
            <p> Learning like never before. </p>
            <div>
            <button className='trialButton'> Free Trial </button>
            </div>
            
        </div>
        <div>
            <img src='https://img.freepik.com/premium-vector/curriculum-learning-education-student-academic-study-new-knowledge-scholarship_1092808-31229.jpg?w=1380' className='homeImage' width="600px" />
        </div>
    </div>
    </div>
  )
}

export default Home