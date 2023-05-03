import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import logo from '../../asset/logo.png'
import Login from '../Login/Login'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const user = useSelector((state) => state.user.value)

    return (
        <div className='navbar'>
            <Link to='/'>
                <div className='brand'>
                    <img src={logo} />
                    <h1>Collab</h1>
                </div>
            </Link>
            <div className='navlinks'>
                <Link className='link'>Features</Link>
                <Link className='link'>Pricing</Link>
                {user ? <Link className='link' to="/dashboard">Dashboard</Link> : null}
                <Login className='link' />
            </div>
        </div>
    )
}

export default Navbar