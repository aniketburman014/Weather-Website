import React from 'react'
import { iconUrlFromCode } from '../services/weatherService';
function Forecast({items}) {
  if (!items) {
    // If hourly data is not available yet, you can display a loading state or return null
    return <p>Loading...</p>;
  }
  return (
    <div>
    <div className='flex items-center justify-start mt-6'>
     <p className='text-white font-medium uppercase'>hourly forecast
     </p>
     </div>
     <hr className='my-2' />

     <div className='flex flex-row items-center justify-between text-white'>
     {items.map((item, index) => (
      <div key={index} className="flex flex-col items-center justify-center">
        <p className="font-light text-sm">{item.title}</p>
        <img src={iconUrlFromCode(item.icon)}alt="" className="w-12 my-1" />
        <p className="font-medium">{item.temp.toFixed()}&deg;</p>
      </div>
    ))}


     </div>
    </div>
  )
}


export default Forecast;