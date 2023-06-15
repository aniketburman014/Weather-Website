import React from 'react';
import {FaEye, FaTachometerAlt } from "react-icons/fa";
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService';
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown
} from "@iconscout/react-unicons";

function TempAndDetail({weather}) {
  const {details,temp,feels_like,temp_min,temp_max,pressure,humidity,speed,visibility,icon,sunrise,sunset,timezone} = weather;
  return (
    <div>
    <div className='flex flex-col items-center justify-center py-6 text-cyan-300'>
    <p className='text-xl py-2'>{details}</p>
    <div className='flex  font-light text-sm items-center text-white'>
    <UilTemperature size={18}className='mr-1' />
    Feels like
    <span className='font-medium ml-2'>{`${feels_like.toFixed()}°`}</span>
    </div>
    </div>
    <div className='flex flex-row items-center justify-between text-white  py-3'>
    <img src={iconUrlFromCode(icon)} alt='' width={150} />
    <p className='text-5xl'>{`${temp.toFixed()}°`}</p>
    <div className='flex flex-col space-y-1.5'>
  
    <div className='flex  font-light text-sm items-center'>
    <UilTear size={18}    className='mr-1' />
    Humidity:
    <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
    </div>

    <div className='flex  font-light text-sm items-center'>
    <FaTachometerAlt style={{ color: 'rgba(255, 255, 255, 0.9)' }} size={16} className='mr-1' />
    Pressure:
    <span className='font-medium ml-1'>{`${pressure.toFixed()}`} mb</span>
    </div>

    <div className='flex  font-light text-sm items-center'>
    <FaEye size={16} style={{ backgroundColor: 'transparent', color: 'rgba(255, 255, 255, 0.9)' }} className='mr-1' />
    Visibility:
    <span className='font-medium ml-1'>{`${visibility.toFixed()/1000}`} km</span>
    </div>

    <div className='flex  font-light text-sm items-center'>
    <UilWind size={18} className='mr-1' />
    Wind:
    <span className='font-medium ml-1'>{`${speed.toFixed()}`} km/h</span>
    </div>

    </div>
    </div>

    
    <div className='flex flex-row justify-center items-center text-white text-sm space-x-2 py-3'>
    <UilSun size={20} /> 
    <p className='font-light'>
    Rise <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
    </p>
    <p className='font-light  text-gray-300'>|</p>
    
    <UilSunset size={20} />
    <p className='font-light'>
    Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span>
    </p>
    <p className='font-light  text-gray-300'>|</p>

    <UilArrowUp size={20} /> 
    <p className='font-light'>
    High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span>
    </p>
    <p className='font-light text-gray-300'>|</p>

    <UilArrowDown size={20} /> 
    <p className='font-light'>
    Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span>
    </p>

    

    </div>

    </div>
  )
}

export default TempAndDetail