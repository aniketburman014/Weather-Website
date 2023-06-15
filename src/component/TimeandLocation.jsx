import React from 'react'
import { formatToLocalTime } from "../services/weatherService";
function TimeandLocation (params) {
  const {country, name, dt, timezone}=params.weather;
  
  return (
    <div>
    <div className='flex justify-center item-center my-6'>
    <p className='text-white text-xl font-extralight'>{formatToLocalTime(dt, timezone)}</p>
    </div>
    <div className='flex justify-center items-center my-3'>
    <p className='text-white text-3xl font-medium'>{`${name}`}, {`${country}`}</p></div>
    </div>
  )
}

export default TimeandLocation;
