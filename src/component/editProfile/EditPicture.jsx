import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateImage } from "../../services/userFunction.js";
import { updateProfile } from '../../slice/userSlice.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditPicture = ({token, dp}) => {

  const userData= useSelector( (state) => state.user.user);
  const navigate= useNavigate();
  const dispatch= useDispatch();

  const randomImage= `https://ui-avatars.com/api/?background=random&color=fff&name=${userData?.fullName}&format=png`

  const {
    register,
    handleSubmit,
    formState: {errors},
    watch
  }= useForm({
    defaultValues:{
      image: dp || randomImage
    }
  });

  const submitHandler= async(data) => {

    const formData= new FormData();

    console.log("data ", data.image[0]);
    console.log("dp : ", dp);

    if( data.image[0] === 'h') {
      toast.error("Plz select an image first");
      return;
    }

    formData.append("image", data.image[0]);
    
    const response= await updateImage(token, formData);
    if( response.success){
      toast.success(response?.message || "DP updated");
      dispatch(updateProfile({dp: response?.data}));
      formData.delete("image")
      navigate('/profile')
    } else{
      toast.error("Something went wrong")
    }
    

  }

  // handle image change 
  const imageFile = watch("image");
  const imagePreview =
  imageFile instanceof FileList && imageFile.length > 0
    ? URL.createObjectURL(imageFile[0])
    : typeof imageFile === "string" 
      ? imageFile  // Use the URL if it's a string (default value)
      : dp || randomImage;
  
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);


  return (
    <div className='mb-10'>
      
      <div className='flex items-center gap-x-4 bg-slate-800 p-10 border border-slate-700 rounded-lg'>
            <img src={`${imagePreview ? imagePreview : userData?.dp || "" }`} 
            className='rounded-full w-20 h-20 aspect-auto'
            alt={'profile pic'} />
            <form 
            className=''
            onSubmit={handleSubmit(submitHandler)}>
                <p>Change Profile Picture</p>
                <div className='my-2'> 
                      <label className='mr-4 bg-gray-700 cursor-pointer 
                      py-2 px-3 font-semibold '>Select
                        <input type="file" name="image"
                        className='w-0' 
                        accept='image/*'
                        {...register("image")}
                      
                        />
                      </label>
                      <button type='submit' disabled={!imageFile} 
                      className={`py-2 px-3 text-black font-semibold  
                                  ${!imageFile ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer bg-yellow-400"}`}>
                        Upload</button> 
                </div>
            </form>
          </div>

    </div>
  )
}

export default EditPicture
