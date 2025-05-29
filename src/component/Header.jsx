import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { setAllCategory } from '../slice/categorySlice';
import { getAllCategory } from '../utils/categoryFunction';
import { VscAccount } from "react-icons/vsc";
import { MdArrowDropDown } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { RiDashboard2Line } from "react-icons/ri";
import { setLogout } from '../slice/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {


  const isLoggedIn= useSelector( (state) => state.user.isLoggedIn);
  const userData= useSelector( (state) => state.user.user);

  const randomImg= `https://ui-avatars.com/api/?background=random&color=fff&name=${userData?.userName}&format=png`;

const dispatch = useDispatch();
const navigate= useNavigate();
const categories = useSelector((state) => state.category.allCategory);

const [ visible, setVisible]= useState(false);

useEffect(() => {
  // Only fetch if categories array is empty
  if (categories.length === 0) {
    getCategories();
  }
}, [categories.length]); // Add dependency to prevent stale closures

const getCategories = async () => {
 
    const res = await getAllCategory();
    
    if( res.success) {
    // Dispatch to Redux only - remove local state management
    dispatch(setAllCategory(res.data || []));
    }
};

  const NavbarLinks= [
    {
      title: "Home",
      path: "/"
    },
    {
      title: "Explore",
      path: "/test"
    },
    {
      title: "About us",
      path: "/about"
    },
    {
      title: "Contact us",
      path: "/contact"
    },
  ]

  return (
    <div className='flex sm:relative bg-[#000814] w-screen 
    relative z-50 h-17 items-center justify-around 
    border-b-[1px] border-b-richblack-700 translate-y  
    transition-all duration-500'>

        <h2 className='w-[5vw] hover:cursor-pointer'> <NavLink to="/"> Logo </NavLink> </h2>

        
{/* <div className="relative">
  <input
    placeholder="Search..."
    className="input shadow-lg bg-[#161D29] border-gray-300 pl-3 pr-10 py-2 
    rounded-xl w-48 focus:outline-none"
    name="search"
    type="search"
  />
  <svg
    className="size-6 absolute top-2 right-3 text-gray-500"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      strokeLinejoin="round"
      strokeLinecap="round"
    ></path>
  </svg>
</div> */}

<nav>
            <ul className=' flex-row gap-x-6 text-richblack-25 gap-5 hidden md:flex'>
                  {
                    NavbarLinks?.map((element, index) => (
                          <li key={index} >
                                {
                                  element.title === "Explore" ? 
                                  (<div className=' flex items-center group relative cursor-pointer'>
                                            <p className='flex'>{element.title} 
                                              <MdOutlineKeyboardArrowDown className='text-2xl' /> </p>
                                          
                                            <div className='invisible absolute 
                                            left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] 
                                            translate-y-[3em] flex-col rounded-lg bg-[#F1F2FF] p-4 
                                            text-[#000814] opacity-0 transition-all duration-150 
                                            group-hover:visible group-hover:translate-y-[1.65em] 
                                            group-hover:opacity-100 lg:w-[300px]'>
                                                <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 
                                                translate-x-[80%] translate-y-[-40%] rotate-45 select-none 
                                                rounded bg-[#F1F2FF]'></div>
                                                {
                                                    categories?.length < 0 ? (<div></div>) : (
                                                        categories?.map((element, index) => (
                                                            <Link to={`/catalog/${element?.category}`} key={index} 
                                                            className="rounded-lg bg-transparent py-2 pl-4 hover:bg-[#C5C7D4]" >
                                                                <p className=''>
                                                                    {element?.category}
                                                                </p>
                                                            </Link>
                                                        ))
                                                    )

                                                }
                                            </div>
                                    </div>) : (

                                    <NavLink to={element?.path}  >
                                                <p className= "text-richblack-25 hidden md:block" >
                                                    {element?.title}
                                                </p>
                                    </NavLink>
                                        )
                                    }
                                </li>
                    ))
                    }
                  </ul>
                </nav>
      
      

      {
        !isLoggedIn ? ( <div className='flex justify-between gap-4'>
          <NavLink  className='py-2 px-3 rounded-lg border ' to="/login">Login</NavLink >
          <NavLink  className='py-2 px-3 rounded-lg border ' to="/register">Sign up</NavLink >
           </div> )
          : (
            <div onClick={()=> setVisible(!visible)}
            className='flex justify-between cursor-pointer items-center relative'>
         
                <img src={ userData?.dp ||  randomImg} alt='profile image' className='w-8 h-8 rounded-full' /> 
            <MdArrowDropDown className='text-2xl' />
            <div className={`absolute transition-all z-10 top-8 -left-10 divide-[#2C333F]
            overflow-hidden rounded-md border-[1px] border-[#2C333F] bg-[#161D29]
            duration-300 text-[#000814]  ${visible ? "opacity-100 pointer-events-auto" :
               "pointer-events-none opacity-0"} `} > 

                <p onClick={()=> { setVisible(false); navigate('/profile') } }
                className='flex items-center gap-x-2  p-2 rounded-lg transition-colors duration-300 
                py-[10px] px-[12px] text-sm text-[#AFB2BF] hover:bg-[#2C333F] hover:text-[#DBDDEA]'>
                 <RiDashboard2Line className='text-xl'/>
                 <span> Dashboard</span>
                </p>

                <p onClick={()=> { setVisible(false); dispatch(setLogout()) } }
                className='flex items-center gap-x-2 p-2 rounded-lg transition-colors duration-300 
                py-[10px] px-[12px] text-sm text-[#AFB2BF] hover:bg-[#2C333F] hover:text-[#DBDDEA]'>
                <MdLogout className='text-xl'/>
                <span>Logout</span>
                </p>
            </div>
        </div>
          )
      }
  

    </div>
  )
}

export default Header
