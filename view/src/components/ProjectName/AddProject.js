import React from 'react'
import './ProjectName.scss'
import add from '../../asset/add2.svg'
import { useDispatch } from 'react-redux'
import { showProjectModal } from '../../reducers/modal'

const AddProject = () => {

    const dispatch = useDispatch();

    return (
        <div className='add-project project-name' onClick={() => dispatch(showProjectModal({}))}>
            <img src={add} />
            <p>
                Add Project
            </p>
        </div>
    )
}

export default AddProject