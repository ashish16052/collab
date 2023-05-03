import React, { useState, useEffect } from 'react'
import axios from 'axios'
import invite from '../../asset/invite.svg'
import kanbanIcon from '../../asset/kanban.svg'
import listIcon from '../../asset/list.svg'
import calendarIcon from '../../asset/calendar.svg'
import timelineIcon from '../../asset/timeline.svg'
import add from '../../asset/add.svg'
import edit from '../../asset/edit.svg'
import Kanban from '../Kanban/Kanban'
import Calendar from '../Calendar/Calendar'
import List from '../List/List'
import TimeLine from '../Timeline/Timeline'
import './Board.scss'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { list, kanban, calendar, timeline } from '../../reducers/view'
import TaskPage from '../AddTask/TaskPage'
import { showProjectModal } from '../../reducers/modal'
import { useParams } from 'react-router-dom';
import logo from '../../asset/logo.png'

import { showTaskModal } from '../../reducers/modal'
import { setProject } from '../../reducers/project'

const Board = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)
  const view = useSelector((state) => state.view.value)
  const modal = useSelector((state) => state.modal.value).taskModal
  const prmodal = useSelector((state) => state.modal.value).projectModal
  const projectData = useSelector((state) => state.project.value)
  
  var { id } = useParams();
  const [project, setProjectData] = useState({});
  axios.defaults.withCredentials = true
  
  const getProject = async () => {
    const { data } = await axios.post(`http://localhost:5001/v1/project/readOne/${id}`)
    // console.log(data);
    setProjectData(data);
    setProject(data);
  }

  useEffect(() => {
    getProject()
  }, [projectData, prmodal, user, modal, id])

  return (
    <div className='board'>
      {
        project && project._id ?
          <div>
            <div className='dash-nav'>
              <div className='project-info'>
                <img className='edit' src={edit} onClick={() => dispatch(showProjectModal(project))} />
                <h2 className='project-title'>{project.name}</h2>
              </div>
              <div className='view'>
                <button onClick={() => dispatch(list())}>
                  <img src={listIcon} />
                </button>
                <button onClick={() => dispatch(kanban())}>
                  <img src={kanbanIcon} />
                </button>
                {/* <button onClick={() => dispatch(calendar())}>
            <img src={calendarIcon} />
          </button>
          <button onClick={() => dispatch(timeline())}>
            <img src={timelineIcon} />
          </button> */}
              </div>
              <div className='add-task' onClick={() => { dispatch(showTaskModal()) }}>
                <img src={add} />
                <p>
                  Add Task
                </p>
              </div>
              <div className='team'>
                <img src={invite} onClick={() => dispatch(showProjectModal(project))} />
                <div className='team-bar'>
                  {
                    project.team.map((member, index) => (
                      <img className="pfp" src={member.profilePic} key={index} referrerPolicy="no-referrer" />
                    ))
                  }
                </div>
              </div>
            </div>
            <div className='board-area'>
              {(() => {
                switch (view) {
                  case 'list':
                    return <List />
                  case 'kanban':
                    return <Kanban />
                  case 'calendar':
                    return <Calendar />
                  case 'timeline':
                    return <TimeLine />
                  default:
                    return null
                }
              })()}
            </div>
          </div>
          : <div className='placeholder'>
            <img src={logo} />
            <p>Select or Create a project</p>
          </div>
      }
      {
        modal && <TaskPage project={project} />
      }
    </div>
  )
}

export default Board