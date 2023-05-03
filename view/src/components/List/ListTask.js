import React, { useState, useEffect } from 'react'
import axios from 'axios'
import done from '../../asset/done.svg'
import todo from '../../asset/todo.svg'
import pending from '../../asset/pending.svg'
import './List.scss'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { showTaskModal } from '../../reducers/modal'
import { useParams } from 'react-router-dom';

const ListTask = (props) => {

    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch();
    const [status, setStatus] = useState(props.task.taskStatus)
    var { id } = useParams();
    const [task, setTask] = useState(props.task)



    const getDate = (date) => {
        const today = new Date(date)
        const yyyy = today.getFullYear()
        let mm = today.getMonth() + 1
        let dd = today.getDate()

        if (dd < 10) dd = '0' + dd
        if (mm < 10) mm = '0' + mm

        const formattedToday = dd + '/' + mm + '/' + yyyy;
        return formattedToday;
    }

    const changeStatus = (event, newStatus) => {
        event.stopPropagation();
        console.log(newStatus);
        var statusChange;
        switch (newStatus) {
            case 'to do':
                statusChange = 'pending'
                break;
            case 'pending':
                statusChange = 'done'
                break;
            case 'done':
                statusChange = 'to do'
                break;
        }
        setStatus(statusChange);
        var body = {
            taskStatus: statusChange,
        }
        axios.post(`http://localhost:5001/v1/task/update/${props.task._id}`, body)
            .then((response) => {
                console.log(response.data);
                setTask(response.data);
            });
    }

    useEffect(() => {
        props.getTasks()
    }, [status])


    const showModal = () => {
        dispatch(showTaskModal(props.task))
    }

    return (
        <div className='list-task' onClick={(e) => showModal(e)}>
            {(() => {
                switch (status) {
                    case 'to do':
                        return <img className='status' src={todo} onClick={(e) => changeStatus(e, 'to do')} />
                    case 'pending':
                        return <img className='status' src={pending} onClick={(e) => changeStatus(e, 'pending')} />
                    case 'done':
                        return <img className='status' src={done} onClick={(e) => changeStatus(e, 'done')} />
                    default:
                        return null
                }
            })()}
            <div className='list-title'>{props.task.title}</div>
            <div className='date'>{getDate(props.task.start)}</div>
            <div className='date'>{getDate(props.task.end)}</div>
            <div className='tags'>
                {
                    props.task.tags.map((tag, index) => (
                        <div className='tag' key={index}>{tag}</div>
                    ))
                }
            </div>
            <div className='people'>
                {
                    props.task.assign.map((member, index) => (
                        <img className='people-pfp' src={member.profilePic} key={index} referrerPolicy="no-referrer" />
                    ))
                }
            </div>
        </div>
    )
}

export default ListTask