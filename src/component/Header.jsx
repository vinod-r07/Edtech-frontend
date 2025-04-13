import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";

const Header = () => {
  return (
    <div className='w-[100vw] border-b items-center px-10 h-20 bg-[#000814] flex  justify-between'>

        <h2 className='w-[5vw] hover:cursor-pointer'> <NavLink to="/"> Logo </NavLink> </h2>

        
<div className="relative">
  <input
    placeholder="Search..."
    className="input shadow-lg bg-[#161D29] focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-60 transition-all focus:w-64 focus:outline-none"
    name="search"
    type="search"
  />
  <svg
    className="size-6 absolute top-3 right-3 text-gray-500"
    stroke="currentColor"
    stroke-width="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      stroke-linejoin="round"
      stroke-linecap="round"
    ></path>
  </svg>
</div>



        <div>
            <ul className='flex hover:cursor-pointer w-[50vw] justify-around'>
                <li> <NavLink to="/"> Home   </NavLink> </li>
                <li> <NavLink to="/course"> Course </NavLink> </li>
                <li> <NavLink to="/my-batches"> My batches  </NavLink> </li>
                <li> <NavLink to="/login" >Login</NavLink> </li>
            </ul>
        </div>
      
    </div>
  )
}

export default Header
