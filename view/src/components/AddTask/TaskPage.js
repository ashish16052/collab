import React, { useState, useEffect } from 'react'
import './AddTask.scss'
import './Date.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import { useDispatch } from 'react-redux'
import { hideTaskModal } from '../../reducers/modal'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AddTask = (props) => {

    const taskData = useSelector((state) => state.modal.value).taskData

    const [title, setTitle] = useState(taskData ? taskData.title : '')
    const [titleError, setTitleError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [assignError, setAssignError] = useState(false)
    const [description, setDescription] = useState(taskData ? taskData.description : '')
    const [startDate, setStartDate] = useState(taskData ? new Date(taskData.start) : new Date());
    const [endDate, setEndDate] = useState(taskData ? new Date(taskData.end) : new Date());
    const [taskStatus, setTaskStatus] = useState(taskData ? { value: taskData.taskStatus, label: taskData.taskStatus } : { value: 'to do', label: 'to do' });
    const [team, setTeam] = useState(taskData ? taskData.assign.map((member) => {
        var obj = {}
        obj.value = member;
        obj.label = member.name;
        return obj;
    }) : [])
    const [tags, setTags] = useState(taskData ? taskData.tags.map((tag) => {
        var obj = {}
        obj.value = tag;
        obj.label = tag;
        return obj;
    }) : [])

    var { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    var teamOption = props.project.team.map((member) => {
        var obj = {}
        obj.value = member;
        obj.label = member.name;
        return obj;
    })

    var tagsOption = props.project.tags.map((tag) => {
        var obj = {}
        obj.value = tag;
        obj.label = tag;
        return obj;
    })

    var statusOption =
        [
            { value: 'to do', label: 'to do' },
            { value: 'pending', label: 'pending' },
            { value: 'done', label: 'done' },
        ]

    const save = async () => {
        var assign = team.map((member) => {
            return member.value
        })
        var tagArray = tags.map((tag) => {
            return tag.value
        })

        if (title.length == 0 || startDate > endDate || assign.length == 0) {
            if (title.length == 0)
                setTitleError(true)
            if (startDate > endDate)
                setDateError(true)
            if (assign.length == 0)
                setAssignError(true)
            return;
        }

        var body = {
            _id: taskData ? taskData._id : Date.now(),
            title: title,
            description: description,
            start: startDate,
            end: endDate,
            assign: assign,
            tags: tagArray,
            projectId: id,
            taskStatus: taskStatus.value,
            cDate: Date.now(),
            uDate: Date.now()
        }
        axios.post(`http://localhost:5001/v1/task/create`, body)
            .then((response) => {
                // console.log(response.data);
                dispatch(hideTaskModal())
            });
    }

    const deleteTask = async () => {
        axios.post(`http://localhost:5001/v1/task/delete/${taskData._id}`)
            .then((response) => {
                dispatch(hideTaskModal())
            });
    }

    return (
        <div className='addTask'>
            <div className='addTask-modal'>
                <form className='task-form'>
                    {titleError
                        ? <input value={title} onChange={(e) => { setTitle(e.target.value); setTitleError(false) }} type='text' placeholder='Task title' className='task-title red' />
                        : <input value={title} onChange={(e) => { setTitle(e.target.value); setTitleError(false) }} type='text' placeholder='Task title' className='task-title' />
                    }
                    <hr />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='task-description' type='text' placeholder='Task description' rows='5' />
                    {dateError
                        ?
                        <div className='date red'>
                            <div className='date-wrapper'>
                                <p>Start Date: </p>
                                <DatePicker selected={startDate} onChange={(date) => {setStartDate(date);setDateError(false)}} dateFormat="dd/MM/yyyy" />
                            </div>
                            <div className='date-wrapper'>
                                <p>End Date: </p>
                                <DatePicker selected={endDate} onChange={(date) => {setEndDate(date);setDateError(false)}} dateFormat="dd/MM/yyyy" />
                            </div>
                        </div>
                        :
                        <div className='date'>
                            <div className='date-wrapper'>
                                <p>Start Date: </p>
                                <DatePicker selected={startDate} onChange={(date) => {setStartDate(date);setDateError(false)}} dateFormat="dd/MM/yyyy" />
                            </div>
                            <div className='date-wrapper'>
                                <p>End Date: </p>
                                <DatePicker selected={endDate} onChange={(date) => {setEndDate(date);setDateError(false)}} dateFormat="dd/MM/yyyy" />
                            </div>
                        </div>
                    }
                    <div className='dropdowns'>
                        <CreatableSelect onChange={(e) => setTags(e)} value={tags} placeholder='Tags' className='select' isMulti isClearable options={tagsOption} />
                        {assignError
                            ? <Select onChange={(e) => { setTeam(e); setAssignError(false) }} value={team} placeholder='Assign' isMulti name="colors" options={teamOption} className="basic-multi-select select red" classNamePrefix="select" />
                            : <Select onChange={(e) => { setTeam(e); setAssignError(false) }} value={team} placeholder='Assign' isMulti name="colors" options={teamOption} className="basic-multi-select select" classNamePrefix="select" />
                        }
                    </div>
                    <Select onChange={(e) => setTaskStatus(e)} value={taskStatus} placeholder='Status' name="colors" options={statusOption} className="basic-multi-select select" classNamePrefix="select" />
                </form>
                <div className='action-buttons'>
                    <span className='delete' onClick={deleteTask}>Delete</span>
                    <div className='action-buttons-right'>
                        <span className='cancel' onClick={() => { dispatch(hideTaskModal()) }}>Cancel</span>
                        <span className='save' onClick={save}>Save</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTask