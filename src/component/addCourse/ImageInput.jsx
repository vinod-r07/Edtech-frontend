

import React from 'react'
import { useState } from 'react'

const ImageInput = ({name, label, register, errors, setValue}) => {
    const [image, setimage] = useState(null)

    const handleChange = (e) => {
        const file = e.target.files[0];
        setValue(name, e.target.files[0]);
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setimage(reader.result);
            }
            reader.readAsDataURL(file);
        }
        else {
            console.log("no file");
        }
    }


  return (
    <div className='m-5'>
        {
            image ? (
                <div className="flex flex-col space-y-2">
                    <img src={image} alt="" className="w-full h-80 rounded-md object-cover"/>
                    <button type="button" onClick={()=>{setimage(null);setValue(name, null)}} className="text-sm text-richblack-5">Remove</button>
                </div>
            ) : (
                <div className="flex flex-col space-y-2">
  <label className="text-sm text-richblack-5" htmlFor={label}>
    <div>
    Course Thumbnail <sup className="text-pink-200">*</sup>
    </div>
  
  <div className="bg-slate-700 flex min-h-[250px] cursor-pointer 
  items-center justify-center rounded-md border-2 border-dotted border-gray-400">
    <div
      className="flex w-full flex-col items-center p-6"
      role="presentation"
      tabIndex={0}
    >


      <input id={label} name={name} type="file" accept="image/*,.jpeg,.jpg,.png" tabIndex="-1" multiple=""  {...register(name, {required:true})} onChange={handleChange} className="hidden" />
      <div className="grid  aspect-square bg-slate-900  p-3  place-items-center rounded-full bg-pure-greys-800">
        <svg  
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-4xl text-yellow-400   rounded-full "
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="16 16 12 12 8 16"></polyline>
          <line x1="12" y1="12" x2="12" y2="21"></line>
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
          <polyline points="16 16 12 12 8 16"></polyline>
        </svg>
      </div>
      <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
        Drag and drop an image, or click to{" "}
        <span className="font-semibold text-yellow-400">Browse</span> a file
      </p>
      <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
        <li>Aspect ratio 16:9</li>
        <li>Recommended size 1024x576</li>
      </ul>
    </div>
  </div>
</label>
{
                errors.courseImage && (<span className='ml-2 text-xs tracking-wide text-pink-200'>
                    Course Image is required**
                </span>)
            }
</div>
)

        }
        


    </div>
  )
}



export default ImageInput;