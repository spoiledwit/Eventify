import React from 'react'
import notfound from "../assets/noitems.png"

const NoItems = ({title, description}) => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-10 gap-4'>
      <div className='md:w-48 md:h-48 w-28 h-28 rounded-full p-5 bg-white shadow-lg flex items-center justify-center'>
        <img className='w-full h-auto' src={notfound} alt="Not Found" />
      </div>
      <h3 className='text-xl whitespace-nowrap sm:text-3xl md:text-4xl font-semibold text-gray-700'>{title}</h3>
      <p className='text-sm sm:text-base md:text-lg max-w-md text-center text-gray-500'>{description}</p>
 </div>
  )
}

export default NoItems;
