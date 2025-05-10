import React from 'react';
import { FaEdit } from "react-icons/fa";
import { useSelector} from 'react-redux';
import Sidebar from '../component/profile/Sidebar';
import { Navigate, useNavigate } from 'react-router-dom';

const Profile = () => {

  const userData= useSelector( (state) => state.user.user);
  const navigate= useNavigate();

  const randomImage= `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${userData?.fullName}&format=png`

  return (
    <div className='bg-slate-950 flex justify-between '>
    
      <Sidebar />

      {/* Main content */}
       <div className='w-[78vw]  p-10'>
        <p className=' text-3xl flex justfi'>My profile </p>

        <div className='relative bg-slate-700 flex items-center py-6 my-8'>
           
            <img className='ml-12 mr-6 w-40 h-40 rounded-full '
             src={userData?.dp || randomImage} alt="profile pic" />
            <div>
            <p className='font-semibold'> {userData?.fullName} </p>
            <p className='text-gray-300 my-2'>{userData?.branch}</p>
            <p>
               <span> {userData?.college}</span>
               <span>{userData?.college && ","}  {userData?.passingYear} </span> 
            </p>
           
            </div>

            <button 
            onClick={()=> navigate('/edit-profile')}
             className='absolute right-10 top-14 flex gap-4 items-center bg-yellow-500 p-2 
            rounded-lg text-black font-semibold cursor-pointer'> <span>Edit</span> <FaEdit /> </button>

        </div>

        <div className='my-7 bg-slate-700 px-14 py-5'>
          <p className='mb-2 text-xl font-semibold'> Bio </p>
          <p> {userData?.bio} </p>
        </div>

        <div className='p-4 border bg-slate-700 relative'>
            <p className='my-2 mx-10 text-xl font-semibold'>Personal Details</p>
           
            
            <div className='flex my-8  justify-between mx-10 '>

                <div>
                    <p className='mb-1'>Name</p>
                    <p> {userData?.fullName} </p>
                </div>

                <div>
                    <p className='mb-1 pr-3'>Email</p>
                    <p> {userData?.email} </p>
                </div>

            </div>

            <div className='flex my-2  justify-between mx-10'>

<div>
    <p className='mb-1'>Phone</p>
    <p> {userData?.phone} </p>
</div>

<div>
    <p className='mb-1 '>College</p>
    <p> {userData?.college} </p>
</div>

</div>
            
        </div>

      </div> 
        
    
    </div>
  )
}

export default Profile
