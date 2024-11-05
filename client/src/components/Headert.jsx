import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Headert = () => {
  const {currentuser} = useSelector((state) => state.user)
  console.log(currentuser)
  return (
    <div className='bg-slate-200'>
      <div className=' flex justify-between  items-center max-w-6xl max-auto p-3'>
        <Link to={'/'}>
        <h1 className='font-bold'>Auth App</h1>
        </Link>
      
        <ul className=' flex gap-4'>
            <Link to={'/'} >
            <li>Home</li>
            </Link>
           
           <Link to={'/about'}> 
           <li>About</li>
           </Link>
           
           <Link to={'/profile'}>
           {currentuser ? (
              <img src={currentuser.profilePicture} alt=" profile" className='h-7 w-7 rounded-full object-cover'/>
           ):(
            <li>Sign In</li>
           )}
        
           </Link>
           
        </ul>
      </div>
    </div>
  )
}

export default Headert
