import React from 'react'

function Top({setQuery}) {
  const cities=[
    {
      id: 1,
      title: 'Delhi'
    },
    {
      id: 2,
      title: 'London'
    },
    {
      id: 3,
      title: 'Paris'
    },
    {
      id: 4,
      title: 'Tokyo'
    },
    {
      id: 5,
      title: 'Sydney'
    }
  ];
  return (
    <div className='flex my-6 justify-around items-center'>
    
    {cities.map((city) => {
      return <button key={city.id} className='text-lg font-medium text-white' onClick={() => setQuery({q:city.title})}>{city.title}</button>;
    })}
    </div>

  )
}

export default Top