import React from 'react';
import EditData from '../component/editProfile/editData';
import EditPicture from '../component/editProfile/editPicture';
import Sidebar from '../component/profile/Sidebar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {

    const userData= useSelector( state => state.user.user);
    const navigate= useNavigate();

    if( !userData?.token){
        navigate('/login')
    }

  return (
    <div className='flex justify-between bg-slate-900'>
      
      <div className='w-1/5 '>
            <Sidebar />
      </div>
      <div className='w-4/5 p-10  '>
            <p className='text-4xl my-8 '> Edit Profile </p>
            <EditPicture token={userData?.token} dp={userData?.dp}  />
            <EditData  />
      </div>

    </div>
  )
}

export default EditProfile
