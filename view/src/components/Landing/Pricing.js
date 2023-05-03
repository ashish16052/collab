import React from 'react'
import tick from '../../asset/done.svg'
import './Landing.scss'

const Pricing = () => {
  const googleAuth = (e) => {
    e.preventDefault();
    window.open(`https://collab.ashishmohite160.repl.co/auth/google/callback`, "_self");
  }
  return (
    <div className='pricing'>
      <div className='price-card'>
        <h1>0₹/mth</h1>
        <p className='plan'>Basic</p>
        <div className='plan-list'>
          <div className='plan-li'>
            <img src={tick} className='plan-tick' />
            <p>Upto 5 Project</p>
          </div>
          <div className='plan-li'>
            <img src={tick} className='plan-tick' />
            <p>Upto 5 Members</p>
          </div>
          <div className='plan-li'>
            <img src={tick} className='plan-tick' />
            <p>100 Tasks per projects</p>
          </div>
        </div>
        <button className='cta-btn' onClick={googleAuth}>Get Started</button>
      </div>
      <div className='price-card'>
        <h1>0₹/mth</h1>
        <p className='plan'>Premium</p>
        <div className='plan-list'>
          <div className='plan-li'>
            <img src={tick} className='plan-tick' />
            <p>Upto 20 Project</p>
          </div>
          <div className='plan-li'>
            <img src={tick} className='plan-tick' />
            <p>Upto 20 Members</p>
          </div>
          <div className='plan-li'>
            <img src={tick} className='plan-tick' />
            <p>500 Tasks per projects</p>
          </div>
        </div>
        <button className='cta-btn' onClick={googleAuth}>Get Started</button>
      </div>
      <div className='price-card'>
        <h1>0₹/mth</h1>
        <p className='plan'>Buisness</p>
        <div className='plan-list'>
          <div className='plan-li'>
            <img src={tick} className='plan-tick' />
            <p>Unlimited Project</p>
          </div>
          <div className='plan-li'>
            <img src={tick} className='plan-tick' />
            <p>Unlimited Members</p>
          </div>
          <div className='plan-li'>
            <img src={tick} className='plan-tick' />
            <p>Unlimited Tasks per projects</p>
          </div>
        </div>
        <button className='cta-btn' onClick={googleAuth}>Get Started</button>
      </div>
    </div>
  )
}

export default Pricing