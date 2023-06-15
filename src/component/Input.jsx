import React, { useState } from 'react'
import { UilSearch,UilLocationPoint } from '@iconscout/react-unicons'
import { toast } from "react-toastify";


function Input({setQuery,units, setUnits}) {

  const [city,setCity]=useState("");

  function handleUnitChange(props){
    const selUnit=props.currentTarget.name;
    if(units!==selUnit){
      setUnits(selUnit);
    }
  }

  function handleSearchClick(){
    if(city !== '') {
      setQuery({q:city});
    }

  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className='flex flex-row justify-center my-6'>
    <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
    <input type='text' 
    value={city}
    className='focus:outline-none py-1.5 px-3 w-full shadow-xl rounded-md capitalize font-light text-xl placeholder:lowercase'
    placeholder='search for location...'
    onChange={(e => setCity(e.currentTarget.value))}
    />
    <UilSearch size={25} className='transition ease-out hover:scale-125 cursor-pointer text-white' onClick={handleSearchClick} />
    <UilLocationPoint size={25} className='transition ease-out hover:scale-125 cursor-pointer text-white' onClick={handleLocationClick} />
    </div>
    <div className='flex flex-row w-1/4 item-center justify-center'>
    <button name='metric' className='text-xl font-light hover:scale-125 transition ease-out cursor-pointer text-white ' onClick={handleUnitChange} >&deg;C</button>
    <p className='mx-1 text-white text-xl my-1' >|</p>
    <button name='imperial' className='text-xl font-light hover:scale-125 transition ease-out cursor-pointer text-white' onClick={handleUnitChange} >&deg;F</button>
    </div>
    </div>
    

  )
}

export default Input