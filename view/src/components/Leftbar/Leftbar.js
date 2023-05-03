import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../asset/logo.png'
import Profile from '../Profile/Profile'
import ProjectName from '../ProjectName/ProjectName'
import AddProject from '../ProjectName/AddProject'
import './Leftbar.scss'
import ProjectForm from '../ProjectForm/ProjectForm'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setProject } from '../../reducers/project'
import { login } from '../../reducers/user'
import axios from 'axios'

const Leftbar = () => {

    const dispatch = useDispatch()

    const modal = useSelector((state) => state.modal.value).projectModal
    const user = useSelector((state) => state.user.value)
    const [projectList, setProjectList] = useState([])

    useEffect(() => {
        if (user && user.projects) {
            setProjectList(user.projects)
        }
        // console.log(projectList);
    }, [user])

    const getUser = async () => {
        if (user && user._id) {
            const { data } = await axios.post(`http://localhost:5001/v1/user/readOne/${user._id}`)
            // console.log(data);
            dispatch(login(data))
        }
    }

    useEffect(() => {
        getUser();
        // console.log(projectList);
    }, [modal])


    return (
        <div className='leftbar'>
            <Link to='/'>
                <div className='brand'>
                    <img src={logo} />
                    <h2>Collab</h2>
                </div>
            </Link>
            <hr className='hr' />
            <div className='project-list'>
                {
                    projectList.map((project, index) => (
                        <Link className='link' to={"/dashboard/" + project} key={index}>
                            <ProjectName projectId={project} />
                        </Link>
                    ))
                }
                <AddProject />
            </div>
            {
                modal && <ProjectForm />
            }
            <hr className='hr' />
            <Profile />
        </div>
    )
}

export default Leftbar