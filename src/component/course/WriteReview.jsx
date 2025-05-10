import React, { useState, useEffect} from 'react'
import { StarRating2, StarRating } from './rating'
import toast from 'react-hot-toast';
import { addReview } from '../../services/courseFunc.js';

const WriteReview = ({token, courseId, setReview, userAlreadyReview}) => {

    const [ rating, setRating]= useState(0);
    console.log("user review : ", userAlreadyReview[0])

    const onRatingChange= (num) => {
        setRating(num)
    }

    const [ userReview, setUserReview]= useState("");
    const [ err, setErr]= useState(false);

    const submitHandler= async(e) => {
        e.preventDefault();

        if( rating == 0)
        {
            toast.error("Rating is required");
            return;
        }

        if( userReview.trim() === "") {
            setErr(true)
        }
        else setErr(false);

        const formData= {
            rating: Number(rating),
            message: userReview,
            courseId,
        }

        const res= await addReview(token, formData);

        if( res.success) {
            toast.success(res.message)
            setReview(false);
        }

    }

    const randomImage= `https://ui-avatars.com/api/?background=random&color=fff&name=${userAlreadyReview[0]?.userName}&format=png`

  return (
    <div className=' flex w-full justify-center  '>

    { userAlreadyReview ? (<div className='p-10 flex m-10 h-min gap-x-4 border rounded-lg'>
        <img 
            src={userAlreadyReview[0]?.dp || randomImage}
            alt="image" 
            className='rounded-full w-24 h-20'
             />
        <div>
            <p className='font-semibold flex gap-x-4'> 
                <span>{userAlreadyReview[0]?.userName}</span> 
                <span> <StarRating rating={userAlreadyReview[0].userRating} /> </span>
            </p>
            <p> {userAlreadyReview[0]?.userMessage} </p>
        </div>
         </div>) : (
    <form onSubmit={submitHandler} action="" className='flex  h-min flex-col relative p-10  border rounded-2xl my-10'>

        <label>
            Rating<sup className='text-red-600'>*</sup>
        </label>

        <StarRating2  rating={rating} onRatingChange={onRatingChange} />

        <label htmlFor="">
            Description
        </label>

        <textarea name="user review" id="" 
        className='bg-slate-800 my-2 p-2 w-80 h-24 rounded-lg'
        value={userReview} onChange={ (e) => setUserReview(e.target.value)}
        placeholder='Enter Course review message...' required />

        {err && <span className='text-red-500 my-1'> Description is required </span>}
        <button className='py-2 px-3 rounded-lg text-black bg-yellow-400 
        font-semibold cursor-pointer '>Submit</button>
    </form>
    )
}

    </div>
  )
}

export default WriteReview
