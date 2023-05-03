import React from 'react'
import Leftbar from '../../components/Leftbar/Leftbar'
import './Dashboard.scss'
import Board from '../../components/Board/Board'

const Dashboard = () => {

    return (
        <div className='dashboard'>
            <Leftbar />
            <Board />
        </div>
    )
}

export default Dashboard