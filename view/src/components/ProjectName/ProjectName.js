import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showProjectModal } from '../../reducers/modal'
import { setProject } from '../../reducers/project'
import { useSelector } from 'react-redux'
import './ProjectName.scss'

const ProjectName = (props) => {

    const dispatch = useDispatch();
    const [project, setProjectData] = useState({});
    const modal = useSelector((state) => state.modal.value).projectModal
    axios.defaults.withCredentials = true

    const getProject = async () => {
        const { data } = await axios.post(`https://collab.ashishmohite160.repl.co/v1/project/readOne/${props.projectId}`)
        setProjectData(data);

    }

    const setProjectReducer = () => {
        if (project) {
            dispatch(setProject(project))
        }
    }

    useEffect(() => {
        getProject()
    }, [modal])

    return (
        <div className='project-name' onClick={setProjectReducer}>
            {project ? project.name : null}
        </div>
    )
}

export default ProjectName