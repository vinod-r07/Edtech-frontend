import React, { useState, useEffect } from "react";
import Sidebar from "../component/profile/Sidebar";
import { tv } from "tailwind-variants";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { ChangePassword } from "../utils/authFunction";
import { useNavigate } from "react-router-dom";

const formInputText = tv({
  base: "p-3 my-1 rounded-lg w-full border-b-[2px] border-[#3f3f46] border-opacity:90 bg-gray-800",
});

const Setting = () => {

  const token= useSelector( state => state.user.user.token);
  const navigate= useNavigate();

  useEffect( () => {
    if( !token || token.trim () === "" )
      navigate('/login')
  }, [])

  // true -> show password, false -> don't show password
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [eye3, setEye3] = useState(false);

  const [oldPassword, setOldPassword]= useState("");
  const [newPassword, setNewPassword]= useState("");
  const [confirmPassword, setConfirmPassword]= useState("");

  const submitHandler= async(e) => {
    // 1. prevent refresh
    e.preventDefault();

    // 2. check whether any field is empty
    if( 
      [oldPassword, newPassword, confirmPassword].some( field => field.trim() === "" )
    )
    {
      toast.error("All fields are required");
      return;
    }

    // 3. newPassword and confirm password must be same
    if( newPassword !== confirmPassword){
      toast.error("Both password must be same");
      return ;
    }

    const formData= {
      oldPassword,
      newPassword
    }

    const res= await changePassword(token, formData);
    if( res.success){
      toast.success(res?.message);
    }
    else{
      toast.error(res?.message)
    }
    
  }

  return (
    <div className="flex bg-slate-900 justify-between">
      <div className="w-1/5">
        <Sidebar />
      </div>

      <div className="w-4/5 p-10">
        {/* Password */}

        <form onSubmit={submitHandler} className="relative pb-15">

        <div className={ 'sr-only'}>
        <label htmlFor="username" className="block mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="w-full p-2 border rounded"
          autoComplete="username"
        />
      </div>

        <div className="relative mb-2">
          <label>
            Old Password<sup className="text-red-500">*</sup>
            <input
              autoComplete="old-password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type={eye1 ? "text" : "password"}
              className={formInputText()}
            />
          </label>
          {eye1 ? (
            <FaRegEye
              className="absolute top-10 right-5 text-xl"
              onClick={() => setEye1(!eye1)}
            />
          ) : (
            <FaRegEyeSlash
              className="absolute top-10 right-5 text-xl"
              onClick={() => setEye1(!eye1)}
            />
          )}     
        </div>

        <div className="relative mb-2">
          <label>
            New Password<sup className="text-red-500">*</sup>
            <input
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
              type={eye2 ? "text" : "password"}
              className={formInputText()}
            />
          </label>
          {eye2 ? (
            <FaRegEye
              className="absolute top-10 right-5 text-xl"
              onClick={() => setEye2(!eye2)}
            />
          ) : (
            <FaRegEyeSlash
              className="absolute top-10 right-5 text-xl"
              onClick={() => setEye2(!eye2)}
            />
          )}
        </div>

        <div className="relative">
          <label>
            Confirm New Password<sup className="text-red-500">*</sup>
            <input
              value={confirmPassword}
              autoComplete="new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={eye3 ? "text" : "password"}
              className={formInputText()}
            />
          </label>
          {eye3 ? (
            <FaRegEye
              className="absolute top-10 right-5 text-xl"
              onClick={() => setEye3(!eye3)}
            />
          ) : (
            <FaRegEyeSlash
              className="absolute top-10 right-5 text-xl"
              onClick={() => setEye3(!eye3)}
            />
          )}
        </div>

        <button 
        type="submit"
        className="absolute cursor-pointer bottom-0 right-5 bg-yellow-500 p-2 rounded-lg text-black font-semibold">
          Change Password
        </button>


        </form>

        {/* Delete account */}
        <div className="flex my-15 p-10 border-[1px] border-pink-700 gap-x-5 bg-pink-950">
        <div className="flex aspect-square h-16 w-16 items-center justify-center rounded-[100%] px-4 bg-pink-700">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" 
          stroke-linecap="round" stroke-linejoin="round" class="text-3xl text-pink-200" 
          height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
          </div>
           <div className="w-4/7">
            <p className="text-2xl font-semibold mb-3">Delete Account</p>
            <p className="text-pink-300">Would you like to delete account?</p>
            <p className="text-pink-300">This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>

            <p className="italic my-2 cursor-pointer text-pink-500">I want to delete my account.</p>
          </div>
        </div>

        

      </div>


    </div>
  );
};

export default Setting;
