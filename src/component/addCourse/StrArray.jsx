import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";


const StrArray = ({name, label, register, errors, setValue, getValues}) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);


    useEffect(()=> {
        register(name, {
            required:true,
            // validate: (value) => value.length > 0
        })
    },[])

    useEffect(()=> {
        setValue(name, requirementList);
    },[requirementList])

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

  return (
    <div className='m-5'>

        <label className=' text-richblack-5' htmlFor={name}>{label}<sup className='text-red-600'>*</sup></label>
        <div>
            <input
                type='text'
                id={name}
                placeholder='Enter here...'
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className='p-2 my-1 rounded-lg border-b bg-slate-700 border-gray-500 w-full'
            />
            <button
            type='button'
            onClick={handleAddRequirement}
            className='font-semibold text-yellow-400 cursor-pointer mt-3'>
                Add
            </button>
        </div>

        {errors[name] && (
            <span className='m-2 text-xs tracking-wide text-pink-200'>
                {label} is required
            </span>
        )}

        {
            requirementList.length > 0 && (
                <ul className='mt-2 list-inside list-disc'>
                    {
                        requirementList.map((requirement, index) => (
                            <li key={index} className='flex items-center text-richblack-5'>
                                <span>{requirement}</span>
                                <button
                                type='button'
                                onClick={() => handleRemoveRequirement(index)}
                                className='ml-2 text-lg cursor-pointer text-pure-greys-300 '>
                                    <RxCross2/>
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        
      
    </div>
  )
}

export default StrArray