import React from 'react'
import { useAppSelector } from '../../app/hooks'

function Dashboard() {

 const user =  useAppSelector((state)=> state.auth.user);
 console.log("first", user);
  return (
    <div>
      <h1 className='text-2xl font-bold text-center'>Dashboard</h1>
      <div className='flex flex-col items-center justify-center mt-10'>
        <p className='text-lg'>Welcome, {user?.fullName || 'Guest'}!</p>
        <p className='text-md text-gray-600'>Email: {user?.email}</p>
        <p className='text-md text-gray-600'>Username: {user?.username}</p>
      </div>
    </div>
  )
}

export default Dashboard