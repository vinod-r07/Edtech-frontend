import React, {useState, useEffect} from 'react'
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { setUser } from '../slice/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../utils/authFunction';
import toast from 'react-hot-toast';
import { setToken } from '../slice/tokenSlice';

const Login = () => {

  const [open, setOpen ] = useState(true);
  const navigate= useNavigate();
  const dispatch= useDispatch();

  const isUserLoggedIn = useSelector( (state) => state.user.isLoggedIn)

  useEffect( () => {
    if( isUserLoggedIn)
      navigate("/profile")
  }, [navigate, isUserLoggedIn])

  const [ formData, setFormData]= useState({
    email: "",
    password: ""
  })

  const { email, password } = formData;
  
  const handleChange = (e) => {
    setFormData( (prevData) => (
      {
        ...prevData,
        [e.target.name]: e.target.value
      }
    ))
  }

  const submitHandler = async(e) => {

      e.preventDefault();

     const res= await LoginUser(formData);
     
      if( res.success) {
        console.log("response : ", res?.data);
        dispatch(setUser(res?.data?.response));
        dispatch(setToken(res?.data?.accessToken))
        toast.success("User logged in ")
        navigate('/profile');
      } else{
        toast.error("Something went wrong")
      }
  }
  
  return (
    <div className='bg-slate-950 flex justify-between gap-20 p-10'>

    <div>
      <p className='text-2xl font-semibold'>Welcome Back</p>
      <p>Build skills for today, tomorrow, and beyond. <span> Education to future-proof your career.</span></p>

      <form onSubmit={ submitHandler} className='my-6 '>
       <div  className='flex flex-col my-3'>
       <label htmlFor=""> Email<sup className='text-red-400 text-[11px]'>*</sup> </label>
       <input type="text" 
       name='email' 
       value={email}  
       onChange={ handleChange }
       className='p-3 my-1 rounded-lg w-full border-b-[2px] border-[#3f3f46] border-opacity:90 bg-gray-800' placeholder='Enter your email/phone '/>
       </div>
       
       <div className='flex flex-col my-3 '>
       <label htmlFor="">Password <sup className='text-red-400 text-[11px]'>*</sup> </label>
       <div className='relative my-1 h-20'>
       <input type="password" 
       autoComplete='password'
       name='password'
       value={password}
       onChange={handleChange} className='p-3 rounded-lg w-full border-b-[2px] border-[#3f3f46] border-opacity:90 bg-gray-800' placeholder='Enter your password' />
       { open && <IoEyeOutline className='absolute top-4 right-3' onClick={ () => setOpen(!open)} /> }
       { !open && <FaRegEyeSlash className='absolute top-4 right-3' onClick={ () => setOpen(!open)} /> }
       <Link to="/register">
       <p  className="group cursor-pointer text-blue-400 absolute top-13 right-2 transition-all duration-100 ease-in-out"
            
            >
              <span
                className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
              >
                Forget your password
              </span>
            </p></Link>
       </div>
       </div>

      <button className='text-center cursor-pointer bg-yellow-500 p-2 rounded-lg w-full text-black font-semibold' >Sign in</button>
       
      </form>

    </div>

    <div>
      <img src="https://studynotion-master.vercel.app/static/media/login.5eeb0b81544a40330d4b.webp" alt="" />
    </div>

    </div>
  )
}

export default Login
