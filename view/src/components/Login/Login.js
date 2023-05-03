import React from 'react'
import { Link } from 'react-router-dom';
import google from '../../asset/google.jpg'
import './Login.scss'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../../reducers/user'

const Login = () => {

    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch();

    const googleAuth = (e) => {
        e.preventDefault();
        window.open(`https://collab.ashishmohite160.repl.co/auth/google/callback`, "_self");
    }

    const logoutUser = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("user");
        localStorage.removeItem("project");
        window.open(`https://collab.ashishmohite160.repl.co/auth/logout`, "_self");
        dispatch(logout());
    }

    return (
        <div className='login'>
            <form>
                {
                    user && user._id ?
                        <button className='logout' onClick={logoutUser}>
                            <img src={user.profilePic} referrerPolicy="no-referrer" />
                            <p>
                                Logout
                            </p>
                        </button> :
                        <button className='login' onClick={googleAuth}>
                            <img src={google} />
                            <p>
                                Sign in
                            </p>
                        </button>
                }
            </form>
        </div>
    )
}

export default Login