import React from 'react'
import './Profile.scss'
import logoutIcon from '../../asset/logout.svg'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../../reducers/user'

const Profile = () => {

    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch();

    const logoutUser = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("user");
        window.open(`https://collab.ashishmohite160.repl.co/auth/logout`, "_self");
        dispatch(logout());
    }

    return (
        <div className='profile'>
            <img className='pfp' src={user.profilePic} referrerPolicy="no-referrer"/>
            <p className='name'>{user.name}</p>
            <button onClick={logoutUser}>
                <img className='logout' src={logoutIcon} />
            </button>
        </div>
    )
}

export default Profile