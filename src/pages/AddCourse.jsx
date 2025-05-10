import React, {useState, useEffect} from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// components
import Sidebar from '../component/profile/Sidebar'
import StrArray from '../component/addCourse/StrArray';
import ImageInput from '../component/addCourse/ImageInput';

// utilities
import { getAllCategory } from '../utils/categoryFunction';
import { useSelector, useDispatch } from 'react-redux';
import { setAllCategory } from '../slice/categorySlice';
import { categoryUrls } from '../services/api';
import { apiConnector } from '../services/apiConnector';


const AddCourse = () => {

  const dispatch= useDispatch();
  const navigate= useNavigate();

  const token = useSelector( (state) => state.token.token)
  const userData= useSelector( (state) => state.user.user)
  const categories= useSelector( (state) => state.category.allCategory)


  useEffect( () => {
    if( !token )
        navigate('/login')
    if( userData.role !== "Instructor")
        navigate('/profile')
  }, [token])

  // 1. check the category is available or not
  useEffect( () => {
    if (categories.length === 0) {
      getCategories();
    }
  }, [categories.length])

  // 2. call for getting the categories
  const getCategories= async() => {
    const res= await getAllCategory();

    if( res.success) {
      // save the categories in localstorage
      dispatch(setAllCategory(res.data || []));
    }
  }

  // 3. useForm hook
  const { register, handleSubmit, setValue, getValues,  formState:{errors}} = useForm();

  // 4. submit the form
  const submitHandler= async(data) => {

    const formData= new FormData();

    //appending
    formData.append("title", data.courseTitle);
    formData.append("description", data.courseDescription);
    formData.append("price", data.coursePrice);
    formData.append("category", data.courseCategory);
    formData.append("image", data.courseImage);
    formData.append("benefits", data.courseBenefits);
    formData.append("requirements", data.courseRequirements);
    formData.append("topics", data.courseWhatWillYouLearn);

    console.log("token : ", token)

    const ADD_COURSE_API=  categoryUrls.ADD_COURSE_TO_CATEGORY;
    const headers= {
      Authorization: `Bearer ${token}`
  }
          
    try {
      
      const res= await apiConnector("POST", ADD_COURSE_API, formData, headers);

      console.log("response from add course : ", res);
      toast.success("course added to category")

    } catch (error) {
      console.log("error from add course api ", error);
      toast.error("Course is not created")
    }

  }

  return (
    <div className='bg-slate-950 flex justify-between '>
          
        <Sidebar />

        <div className='py-10 w-[75vw]'>
          <p className='text-2xl my-4 font-semibold'>Add course</p>

          <form onSubmit={handleSubmit(submitHandler)} className='bg-slate-800 mb-8'>

          <div className='flex flex-col my-5 mx-5'>

          <label htmlFor="Course category">Course category<sup className='text-sm text-red-600'>*</sup></label>

        <select name="caurse-category" 
        id='courseCategory'
            {...register("courseCategory", {required:true})} 
            className='bg-slate-700 text-white p-2 my-1 rounded-lg border-b'  >
            <option value="" selected disabled hidden>Choose here</option>

    {
  categories && categories.map( (data) => {
    return <option key={data._id} value={`${data?.category}`} >
      {data?.category}
    </option>
  })
}

{ errors.courseCategory && <span className='text-sm my-2 text-red-600'> Course Category is required</span>}
  
</select>

</div>

            <div className='flex flex-col my-5 mx-5'>
              
              <label htmlFor="">Course Title<sup className='text-sm text-red-600'>*</sup> </label>
              
              <input type="text" id='courseTitle' 
              {...register("courseTitle", {required:true})}
              placeholder='Enter Course Title'
              className="p-2 my-1 rounded-lg border-b bg-slate-700 border-gray-500" />

              { errors.courseTitle && <span className='text-sm my-2 text-red-600'> Course Title is required </span> }

            </div>

            <ImageInput name={"courseImage"}
            label={"CourseImage"}
            register={register}
            errors={errors}
            setValue={setValue} />

            <div className='flex flex-col my-5 mx-5'>

              <label htmlFor="">Course Short Description<sup className='text-sm text-red-600'>*</sup></label>

              <textarea   
              {...register("courseDescription", {required:true})}
              type="text" placeholder='Enter short description about course'
              className="p-2 h-32 my-1 rounded-lg border-b bg-slate-700 border-gray-500" />

              {
                errors.courseDescription && <span className='text-sm my-2 text-red-600'> Course Description is required </span>
              }
            </div>

            <div className='flex flex-col my-5 mx-5'>

              <label htmlFor="">Course Price <sup className='text-sm text-red-600'>*</sup> </label>

              <input type="text"
              placeholder='Enter Course Price' 
              id='coursePrice' 
              {...register("coursePrice", {
                required: "Price is required",
                pattern: {
                  value: /^[0-9]{1,5}$/,
                  message: "Enter a valid integer up to 5 digits",
                },
                min: { value: 0, message: "Price must be at least 1" },
                max: { value: 99999, message: "Price cannot exceed 99999" },
              })}
              className="p-2 my-1 rounded-lg border-b bg-slate-700 border-gray-500" />

              { errors.coursePrice && <span className='text-sm my-2 text-red-600'> {errors.coursePrice.message} </span>}

            </div>

            <StrArray  name="courseWhatWillYouLearn"
            label="What Will Your Learn"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues} />

<StrArray  name="courseBenefits"
            label="Course Benefits"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues} />

            <StrArray  name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues} />

              <button className='py-2 m-3 px-3 rounded-4xl text-black font-semibold cursor-pointer bg-yellow-400'>
                Add Course
              </button>

          </form>

          

        </div>
      
    </div>
  )
}

export default AddCourse
