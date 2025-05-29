import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { CiShare1 } from "react-icons/ci";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getCourseInfo } from '../services/courseFunc';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { buyCourse } from '../services/courseFunc';
import {enrollInCourse} from '../slice/userSlice';
import { IoLanguageOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";


const Course = () => {

  const params= useParams();
  const navigate= useNavigate();
  const dispatch= useDispatch();

  const courseId= params.courseId;
  const [ courseData, setCourseData]= useState([]);

  const userData= useSelector( state => state.user.user)

  const [ coursePurchased, setCoursePurchased]= useState(false);

  useEffect( () => {
    setCourseInfo();
  }, [courseId])

  useEffect( () => {
    if( userData) {
      const result= userData?.courses?.find( data => data._id === courseId) ;
    if( result)
      setCoursePurchased(true)
    }
  }, [courseId, userData?.courses])

  const setCourseInfo= async() => {

    const res= await getCourseInfo( courseId);

    // success
    if( res.success) {
      setCourseData( res?.data);
    }
    
  }

  const buyCourseHandler= async() => {

    if( !userData.token)
      navigate('/login');

    console.log('buy course handler click')

    if( coursePurchased){
      navigate('/my-course')
    }

    const res= await buyCourse(userData?.token, courseId);
    if( res.success) {
      toast.success('Course purchased successfully ');
      dispatch(enrollInCourse(courseData))
    }

  }

  
  return (
    <div className='bg-slate-950 min-h-screen relative'>

      <div className='flex m-10 gap-10 justify-between '>

        <div className=' w-3/6'>
            <p className='text-4xl font-semibold py-4 '> {courseData?.title} </p>
            <p className='mb-4'> {courseData?.description} </p>
            <span className='my-5'> {courseData?.rating} ⭐  </span> <span> ({courseData?.userRating?.length} Reviews) </span> <span className='my-2 ml-2 text-gray-400'> {courseData?.students?.length} Students enrolled</span>
            <p className='my-2'>Created By <span className='text-green-500 font-semibold'>{courseData?.instructor?.instructor?.fullName}</span> </p>
            <p className='my-2 flex gap-x-10 '>
              <span className='flex gap-x-2 justify-between items-center'> <CiCalendarDate className='text-2xl'/> May 10, 2025 </span> 
              <span className='flex gap-x-2 justify-between items-center'> <IoLanguageOutline className='text-2xl'/> Hinglish </span>
            </p>

            <div className='mt-20 p-5 border'>
                <p className='text-2xl font-semibold'>What will you learn</p>
                <div>
                  { courseData?.what_will_you_learn?.map( (data, index) => {
                    return <span key={index} className=''>  { index === 0 ? `${data}` : `, ${data}`} </span>
                  })}
                </div>
            </div>

            
        </div>

        <div className='w-2/6 h-min bg-gray-700 p-5  '>
          <img className='w-full rounded-xl' src={courseData?.image} alt="" />
          <p className='my-4 text-lg font-semibold'>  ₹{courseData?.price} </p>
          <button 
          onClick={async() => await buyCourseHandler()}
          className='my-2 cursor-pointer text-center w-full text-black
           bg-yellow-500 p-2 rounded-lg font-semibold'> 
           { coursePurchased ? <span >Go to course</span> : 
                                <span >Buy course</span>} </button>
          
          <p className='my-2 text-center'> 30 days Money Back Guarantee</p>
          <button 
                  className='w-full text-center flex justify-center items-center gap-2'
                  onClick={ () => {
                    navigator.clipboard.writeText(window.location.href)
                    toast.success('url copied on clipboard') } } > 
                  <span className='text-2xl'> <CiShare1/></span> Share course </button>

        </div>
      
      </div>

     
      
    </div>
  )
}

export default Course
