import React,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tv } from 'tailwind-variants';
import toast from 'react-hot-toast';
import { updateData } from '../../services/userFunction.js';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../slice/userSlice.js';

const formInputText= tv({
  base: "p-3 my-2 rounded-lg w-full border-b border-slate-400 border-opacity:60 bg-gray-700"
})

const buttonStyle= tv({
    base: "bg-yellow-400 py-2 px-3 font-semibold text-black cursor-pointer rounded-lg"
})

const EditData = () => {

    const userData= useSelector( state => state.user.user);
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const [ isModified, setIsModified]= useState(false);

    const [ formData, setFormData]= useState({
        fullName: userData?.fullName,
        bio: userData?.bio,
        college: userData?.college,
        branch: userData?.branch,
        passingYear: userData?.passingYear
      })
    
    const { fullName, bio, college, branch, passingYear}= formData;

    const handleChange= (e) => {

        setFormData( (prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))

        // check any modification 
        if(
          ( userData?.fullName !== fullName) ||
          ( userData?.college !== college) ||
          ( userData?.branch !== branch) ||
          (userData?.passingYear !== passingYear) ||
          (userData?.bio !== bio)
        )
        {
            setIsModified(true)
        } else{
          setIsModified(false)
        }

    }

    const submitHandler= async(e) => {
        e.preventDefault();
        
        if( !isModified)
          return;

        const res= await updateData(userData?.token, formData);
        if( res.success) {
          toast.success(res?.message);
          dispatch(updateProfile(formData));
          navigate('/profile')
        }
        else{
          toast.error(res?.message)
        }
    }
    

  return (
    <div>
      
      <form 
      action="" 
      className='bg-slate-800 p-10 rounde-lg border border-slate-700'>
              <div className='flex justify-between'>
                <div className='flex flex-col w-2/5'>
                
                        <label htmlFor="">Full Name
                            <input 
                            onChange={handleChange }
                            value={fullName}
                            required
                            name="fullName"
                            className={formInputText()}/>
                        </label></div>

                <div className='flex flex-col w-2/5'>
                
                        <label htmlFor="">College
                            <input 
                            onChange={handleChange }
                            name='college'
                            value={college}
                            required
                            className={formInputText()}/>
                        </label></div>

              </div>
              <div className='flex justify-between'>
                <div className='flex flex-col w-2/5'>
                
                        <label htmlFor="">Branch
                            <input onChange={handleChange }
                            name='branch'
                            value={branch}
                            required
                            className={formInputText()}/>
                        </label></div>

                <div className='flex flex-col w-2/5'>
                
                        <label htmlFor="">Passing year
                            <input 
                            onChange={handleChange }
                            required
                            name='passingYear'
                            value={passingYear}
                            className={formInputText()}/>
                        </label>
                </div>

              </div>
             
                <div className='flex flex-col '>
                    
                    <label htmlFor="">Bio
                        <input
                        onChange={handleChange }
                        required
                        name='bio'
                        value={bio}
                         className={formInputText()}/>
                    </label>
               
              </div>
              
      </form>
      
      <div className='w-full flex justify-end my-5'>
        <button 
         className={`${buttonStyle()} `}
         onClick={submitHandler}
         > Submit</button>
      </div>

    </div>
  )
}

export default EditData
