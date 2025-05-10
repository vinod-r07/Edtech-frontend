import React, {useState, useEffect} from 'react'
import Sidebar from '../component/profile/Sidebar';
import { course } from '../data/course';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const MyCourse = () => {

  const navigate= useNavigate();

  const isUserLoggedIn= useSelector( (state) => state.user?.isLoggedIn);
  const userData= useSelector( state => state.user.user );

  useEffect( ()=> {
    if( !isUserLoggedIn)
      navigate('/login');
  }, [isUserLoggedIn])
  

  return (
    <div className='bg-slate-950 flex justify-between '>
      
          <Sidebar />

          <div className='p-10 w-[75vw]'>
            <p className='text-3xl '>Enrolled Courses</p>
            <div className='my-6 border rounded-lg'>
              <p className='flex justify-between bg-gray-600 p-4'> 
                <span>Course</span>
                <span>Progress</span>
              </p>
              {
                userData && userData?.courses.map( (data) => {
                  return <Link key={data._id} to={`/view-course/${ data?._id }`}>
                  <div className='flex items-center p-4 border border-gray-700 justify-between'>
                      <div className='flex items-center cursor-pointer'>
                        <img className='w-40' src={data.image} alt="" />
                        <div className='pl-4'>
                          <p className='font-semibold'> {data?.title} </p>
                        <p className=' text-gray-500'> {(data?.description).substring(0, 35)+`...`} </p>
                        </div>
                      </div>
                      <p>
                        5/7
                      </p>
                    </div>
                  </Link>
                })
              }
            </div>
          </div>

    </div>
  )
}

export default MyCourse
