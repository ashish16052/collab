import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ProjectForm.scss'
import { useDispatch } from 'react-redux'
import { hideProjectModal } from '../../reducers/modal'
import CreatableSelect from 'react-select/creatable';
import { useSelector } from 'react-redux'
import { useNavigate  } from 'react-router-dom'

const ProjectForm = () => {

    const user = useSelector((state) => state.user.value)
    const project = useSelector((state) => state.modal.value).projectData
    const defaultUser = {
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        _id: user._id
    }
    const defaultMember = { label: user.name, value: defaultUser }
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [team, setTeam] = useState([defaultMember])
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        if (project && project.team) {
            // console.log(project);
            setTitle(project.name);
            var team = []
            for (var i = 0; i < project.team.length; i++) {
                var obj = {}
                obj.label = project.team[i].name
                obj.value = project.team[i]
                team.push(obj)
            }
            // console.log(team);
            setTeam(team);
        }
    }, [])

    const dispatch = useDispatch();

    const addUser = async (e, a) => {
        // console.log(a);
        if ((a.action === 'remove-value' || a.action === 'pop-value') && a.removedValue.value._id === defaultMember.value._id) {
            return;
        }
        else if (a.action === 'remove-value') {
            setTeam(e.filter(item => item !== a.removedValue))
            if (project && project._id)
                axios.post(`https://collab.ashishmohite160.repl.co/v1/user/removeProject/${a.removedValue.value._id}`,
                    { projectId: project._id })
                    .then((response) => {
                        // console.log(response.data);
                    });
        }
        else if (a.action === 'clear') {
            setTeam([defaultMember]);
        }
        else if (a.action === 'create-option' && e.length) {
            var email = e[e.length - 1].value
            axios.post(`https://collab.ashishmohite160.repl.co/v1/user/Email`,
                {
                    email: email
                })
                .then((response) => {
                    // console.log(response.data);
                    if (response.data) {
                        e[e.length - 1].value = response.data
                        e[e.length - 1].label = response.data.name;
                        var flag = false
                        team.map((p) => {
                            if (p.value._id === response.data._id)
                                flag = true;
                        })
                        if (flag) {
                            setTeam(team)
                            return;
                        }
                        setTeam(e)
                    }
                    else {
                        setTeam(team)
                        setAlert(true)
                    }
                });
        }
    }

    const save = async () => {
        var peopleArr = team.map((user) => {
            var obj = {
                name: user.value.name,
                email: user.value.email,
                profilePic: user.value.profilePic,
                _id: user.value._id
            }
            return obj
        })
        var projectId = project && project.team ? project._id : Date.now()
        var cDate = project && project.cDate ? project.cDate : Date.now()
        // console.log(title);
        // console.log(peopleArr);
        axios.post(`https://collab.ashishmohite160.repl.co/v1/project/create`,
            {
                _id: projectId,
                name: title ? title : 'My Project',
                team: peopleArr,
                uDate: Date.now(),
                cDate: cDate,
            })
            .then((response) => {
                // console.log("Project created")
                // console.log(response.data);
                dispatch(hideProjectModal())
                navigate(`/dashboard/${response.data._id}`);
            });
    }

    const deleteProject = async () => {
        axios.post(`https://collab.ashishmohite160.repl.co/v1/project/delete/${project._id}`)
            .then((response) => {
                // console.log("Project deleted")
                // console.log(response.data);
                dispatch(hideProjectModal())
                navigate("/dashboard");
            });
    }

    return (
        <div className='project-form-wrapper'>
            <div className='project-form-modal'>
                <form className='project-form'>
                    <input value={title} type='text' placeholder='Project title' className='project-title' onChange={(e) => setTitle(e.target.value)} />
                    <hr />
                    <label>Add people: {alert && <span>User not found</span>}</label>
                    <CreatableSelect isClearable={false} onKeyDown={() => setAlert(false)}
                        value={team} formatCreateLabel={(e) => `Add ${e}`} placeholder='Enter Email of People to be Added' className='select' isMulti onChange={(e, m) => addUser(e, m)} />
                </form>
                <div className='action-buttons'>
                    <span className='delete' onClick={deleteProject}>Delete</span>
                    <div className='action-buttons-right'>
                        <span className='cancel' onClick={() => { dispatch(hideProjectModal()) }}>Cancel</span>
                        <span className='save' onClick={() => { save() }}>Save</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectForm