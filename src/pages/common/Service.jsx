import React from 'react'
import { LampDemo } from '../LmapDemo' // Corrected the import path
import { CardHoverEffectDemo } from './CardHoverEffectDemo'
import Header from './Header'
import { SparklesPreview } from '../SparklesPreview'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const Service = () => {
  const navigate=useNavigate()
  const handleBackClick = () => {
    navigate('/');
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: '',background:'black',overflow:'auto',height:'100%' }} >
          <div className="relative left-6 mt-2">
        <button 
          onClick={handleBackClick} 
          className="text-white flex items-center space-x-2  ">
          <FaArrowLeft />
          <span>Back to Home</span>
        </button>
      </div>
        <SparklesPreview text='Services'/>
    
      {/* <LampDemo> */}
       <div className='mb-10'>
       <CardHoverEffectDemo />

       </div>
      {/* </LampDemo> */}
      <LampDemo/>
    </div>
  )
}

export default Service
