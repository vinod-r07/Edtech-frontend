import React from 'react';
import Slider from "react-slick";
import { useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom'

const Test = () => {

  const category= useSelector( state => state.category.allCategory)

  return (
    <div className='min-h-screen p-10 bg-slate-950'>
      
      { category?.map( (data) => {
        return <div key={data._id} className='my-2 cursor-pointer' >
           <NavLink to={`/catalog/${data?.category}`}>
           <p> {data?.category} </p>
           </NavLink>
           </div>
      })}

    </div>
  )
}

export default Test
