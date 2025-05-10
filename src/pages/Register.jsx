import React, { useState, useEffect } from 'react';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { tv } from 'tailwind-variants';
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from '../utils/authFunction.js';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../slice/userSlice.js';
import { setToken } from '../slice/tokenSlice.js';

export const formInputText= tv({
  base: "p-3 my-1 rounded-lg w-full border-b-[2px] border-[#3f3f46] border-opacity:90 bg-gray-800"
})


const Register =  () => {

  const [open, setOpen] = useState(false); // false means password is hidden
  const [role, setRole] = useState("Student");

  const navigate= useNavigate();
  const dispatch= useDispatch();

  const isUserLoggedIn= useSelector( (state) => state.user.isLoggedIn)

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/profile");
    }
  }, [isUserLoggedIn, navigate]);
  

  const [ formData, setFormData]= useState({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    email: "",
  })

  const handleChange= (e) => {
    setFormData( (prevData) => (
      {
        ...prevData,
        [e.target.name]: e.target.value
      }
    ))
  }

  const { fullName, phone, email, password, confirmPassword } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();

    const registerData= {
      fullName,
      phone,
      email,
      password,
      role
    };
 
    const res= await RegisterUser(registerData);

    if( res.success) {
      console.log("response : ", res?.data);
      dispatch(setUser(res?.data?.response))
      dispatch(setToken(res?.data?.token))
      navigate('/profile')
    }

  };

  

  return (
    <div className='bg-slate-950 p-10 flex justify-between gap-20'>

      <div>
      <div>
        <p className='mb-6 text-2xl font-semibold'>Join the millions learning to code with StudyNotion for free</p>

        <p className='my-2 font-semibold'>Build skills for today, tomorrow, and beyond. <span className='text-cyan-500'>Education to future-proof your career.</span></p>
      </div>

      <form onSubmit={submitHandler} className='mb-8'>

      <div className='bg-slate-700 rounded-4xl p-1  mb-4 flex justify-between w-min '>
            <span onClick={() => setRole("Student")} 
                    className={`cursor-pointer transition-colors ease-in-out duration-500 
                    ${ role === "Student" ? ' bg-slate-900 ' : '' } py-2 px-4 rounded-4xl`}>
                      Student</span>
            <span onClick={() => setRole("Instructor")} 
            className={`cursor-pointer transition-colors ease-in-out duration-500 
            ${ role === "Instructor" ? ' bg-slate-900 ' : "" } py-2 px-4 rounded-4xl`}>
              Instructor</span>
            </div>

         

       <div className='flex justify-between '>

       <div className='flex flex-col w-[47%]'>          
          <label htmlFor="">Full Name<sup className='text-red-400 text-[11px]'>*</sup> </label>
          <input type="text" 
          required 
          name='fullName' 
          onChange={handleChange}
          value={fullName}
             className={formInputText()} 
             placeholder='Enter your name'/>
        </div>
        <div className='flex flex-col w-[47%]'>
          <label htmlFor="">Phone<sup className='text-red-400 text-[11px]'>*</sup> </label>
          <input type="text" 
            required
            name='phone'
            value={phone}
            pattern="[0-9]{10}" 
            onChange={handleChange}
           className={formInputText()} 
           placeholder='Enter your phone '/>
           </div>
       </div>

       <div className='my-2'>
        <label htmlFor="">Email <sup className='text-red-400 text-[11px]'>*</sup></label>
        <input type="email" 
        required
        autoComplete="username"
        name='email'
        value={email}
        onChange={handleChange}
        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" title='Plz enter a valid email'
         className={formInputText()} placeholder='Enter your email' />
          </div>

      <div className='flex justify-between'>
      <div className='flex flex-col w-[47%] '>
       <label htmlFor="">Password <sup className='text-red-400 text-[11px]'>*</sup> </label>
       <div className='relative my-1 h-22'>
       <input
  type={open ? "text" : "password"}
  required
  name="password"
  value={password}
  onChange={handleChange}
  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
  autoComplete="new-password"  // ✅ Add this
  className={formInputText()}
  placeholder="Enter your password"
/>
       { open ? <IoEyeOutline className='absolute top-5 right-3' onClick={ () => setOpen(!open)} /> 
       : !open && <FaRegEyeSlash className='absolute top-5 right-3' onClick={ () => setOpen(!open)} /> }
       
       </div>
       </div>

       <div className='flex flex-col w-[47%] '>
       <label htmlFor="">Confirm Password <sup className='text-red-400 text-[11px]'>*</sup> </label>
       <div className='relative my-1 h-22'>
       <input
  type={open ? "text" : "password"}
  required
  name="confirmPassword"
  value={confirmPassword}
  onChange={handleChange}
  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
  autoComplete="new-password"  // ✅ Add this too
  className={formInputText()}
  placeholder="Confirm your password"
/>
       { open ? <IoEyeOutline className='absolute top-5 right-3' onClick={ () => setOpen(!open)} /> : 
       !open && <FaRegEyeSlash className='absolute top-5 right-3' onClick={ () => setOpen(!open)} /> }
       
       </div>
       </div>
      </div>

      <button className='w-full my-2 text-center p-2 bg-yellow-500 rounded-lg text-black font-semibold cursor-pointer'> Sign up</button>

      </form>
      </div>

      <div>
        <img src="https://studynotion-master.vercel.app/static/media/signup.acaf50bcb11d9aec44b4.webp" alt="" />
      </div>
        
    </div>
  )
}

export default Register








  

