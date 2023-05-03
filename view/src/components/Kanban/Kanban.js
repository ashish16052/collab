import React, { useState, useEffect } from 'react'
import Card from './Card'
import './Kanban.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Kanban = () => {
  var { id } = useParams();
  const [taskArray, setTaskArray] = useState([])
  const modal = useSelector((state) => state.modal.value).taskModal

  const getTasks = async () => {
    const { data } = await axios.post(`http://localhost:5001/v1/task/readProject/${id}`)
    // console.log(data);
    setTaskArray(data);
  }

  useEffect(() => {
    getTasks()
  }, [modal])

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    var body = {
      taskStatus: result.destination.droppableId,
    }
    axios.post(`http://localhost:5001/v1/task/update/${result.source.index}`, body)
      .then((response) => {
        console.log(response.data);
        getTasks();
      });
  }

  return (
    <div className='kanban'>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="to do">
          {(provided) => (
            <div className='col' {...provided.droppableProps} ref={provided.innerRef}>
              <h4 >To Do</h4>
              {
                taskArray.map((task, index) => {
                  if (task.taskStatus == 'to do') {
                    return <Card task={task} key={index} id={index.toString()} index={parseInt(task._id)} />
                  }
                })
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="pending">
          {(provided) => (
            <div className='col' {...provided.droppableProps} ref={provided.innerRef}>
              <h4>Pending</h4>
              {
                taskArray.map((task, index) => {
                  if (task.taskStatus == 'pending') {
                    return <Card task={task} key={index} id={index.toString()} index={parseInt(task._id)} />
                  }
                })
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="done">
          {(provided) => (
            <div className='col' {...provided.droppableProps} ref={provided.innerRef}>
              <h4>Done</h4>
              {
                taskArray.map((task, index) => {
                  if (task.taskStatus == 'done') {
                    return <Card task={task} key={index} id={index.toString()} index={parseInt(task._id)} />
                  }
                })
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Kanban