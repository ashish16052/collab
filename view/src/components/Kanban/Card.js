import React from 'react'
import './Kanban.scss'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { showTaskModal } from '../../reducers/modal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Card = (props) => {

    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch();

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

    return (
        <Draggable key={props.id} draggableId={props.id} index={props.index}>
            {(provided) => (
                <div className='card' onClick={() => { dispatch(showTaskModal(props.task)) }} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className='card-title'>
                        <h4>
                            {props.task.title}
                        </h4>
                    </div>
                    <div className='card-desc'>{props.task.description}</div>
                    <div className='dates'>
                        <div className='date'>{getDate(props.task.start)}</div>
                        <div className='date'>{getDate(props.task.end)}</div>
                    </div>
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
            )}
        </Draggable>
    )
}

export default Card