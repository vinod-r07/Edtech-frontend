import React,{ useState} from 'react';
import Slider from "react-slick";
import { useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import toast from 'react-hot-toast';
import { addCategory } from '../utils/categoryFunction';

const Test = () => {

  const [ cat, setCat ]= useState("");

  const handleSubmit=async(e) => {
    e.preventDefault();
    const res= await addCategory(cat);
    if(res.success){
      toast.success(res.msg);
      setCat("");
    }
    else{
      toast.error(res.msg)
    }
  }

  return (
    <div className='min-h-screen p-10 bg-slate-950'>
      
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
          category
          <input type="text" placeholder='' value={cat} onChange={(e)=> setCat(e.target.value)} />
        </label>
        <button className='p-2' type='submit' >Add Category</button>
      </form>

    </div>
  )
}

export default Test
