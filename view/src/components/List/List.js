import React, { useState, useEffect } from 'react'
import './List.scss'
import ListTask from './ListTask'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios';

const List = () => {

  var { id } = useParams();
  const [taskArray, setTaskArray] = useState([])
  const modal = useSelector((state) => state.modal.value).taskModal

  const getTasks = async () => {
    const { data } = await axios.post(`https://collab.ashishmohite160.repl.co/v1/task/readProject/${id}`)
    // console.log(data);
    setTaskArray(data);
  }

  useEffect(() => {
    getTasks()
  }, [modal,id])

  return (
    <div className='list-view'>
      {
        taskArray.map((task, index) => (
          <ListTask task={task} key={index} getTasks={getTasks} />
        ))
      }
    </div>
  )
}

export default List