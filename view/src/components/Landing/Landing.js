import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import oval from '../../asset/oval.svg'
import screenshot1 from '../../asset/screenshot1.png'
import './Landing.scss'

const Landing = () => {
    const user = useSelector((state) => state.user.value)
    const googleAuth = (e) => {
        e.preventDefault();
        window.open(`https://collab.ashishmohite160.repl.co/auth/google/callback`, "_self");
    }

    return (
        <div className='landing'>
            <div className='landing-title'>
            <img src={oval} className='oval'/>
            </div>
            <div className='landing-qoute'>
                Collab helps you to collaborate with your team members and manage tasks easily.
            </div>
            {
                user
                    ? <Link className='link' to="/dashboard">Dashboard</Link>
                    : <button className='cta-btn' onClick={googleAuth}>Get Started</button>
            }
            <img src={screenshot1} className='screenshot1'/>
        </div>
    )
}

export default Landing