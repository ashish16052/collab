import React from 'react'
import './Landing.scss'
import screenshot2 from '../../asset/screenshot2.png'
import screenshot3 from '../../asset/screenshot3.png'
import screenshot4 from '../../asset/screenshot4.png'
import screenshot5 from '../../asset/screenshot5.png'
import scribble from '../../asset/scribble.svg'
import blink from '../../asset/blink.svg'
import oval from '../../asset/oval2.svg'
import curly from '../../asset/curly.svg'


const Features = () => {
  return (
    <div className='features'>
      <div className='feature'>
        <div className='feature-about'>
          <img src={scribble} className='scribble' />
          <p>Create and manage multiple projects or events under one platform</p>
        </div>
        <img src={screenshot2} className='feature-img' />
      </div>
      <div className='feature left'>
        <img src={screenshot3} className='feature-img add-team' />
        <div className='feature-about'>
          <img src={blink} className='blink' />
          <p>Enables team members to communicate and work together in real-time, regardless of location.</p>
        </div>
      </div>
      <div className='feature'>
        <div className='feature-about'>
          <img src={oval} className='oval' />
          <p>Team members can create, view and update their Assigned tasks</p>
        </div>
        <img src={screenshot4} className='feature-img' />
      </div>
      <div className='feature left'>
        <img src={screenshot5} className='feature-img' />
        <div className='feature-about'>
          <img src={curly} className='curly' />
          <p>Track progress and deadlines with kanban board view.</p>
        </div>
      </div>
    </div>
  )
}

export default Features