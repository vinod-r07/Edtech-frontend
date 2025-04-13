import React from 'react'
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { FaGlobeAsia } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

const Contact = () => {
  return (
    <div className='bg-[#000814] w-full flex justify-between'>

        <div className='bg-[#161D29] h-min ml-10  my-20 p-10'>
            <ul className=''>
                <li className='pb-6'> 
                        <h2 className='flex gap-4 items-center text-xl'> <HiChatBubbleLeftRight/> Chat us</h2>
                        <p className='text-gray-400'>Our friendly team is here to help. </p>

                        <p className='text-gray-400 font-semibold text-sm'>info@edugoal.com</p>
                 </li>

                <li className='py-6'>
                    <h2 className='flex gap-4 items-center text-xl'> <FaGlobeAsia/> Visit us</h2>
                    <p className='text-gray-400'>Come and say hello at our office HQ.</p>
                    <p className='text-gray-400 font-semibold text-sm'>Hathua chowk, Mirganj, Gopalganj Bihar-841438</p>
                </li>

                <li className='py-6'>
                    <h2 className='flex gap-4 items-center text-xl'> <IoCall/> Call us</h2>
                    <p className='text-gray-400'>Mon- Fri 8am to 5pm</p>
                    <p className='text-gray-400 font-semibold text-sm'>+91 9133 000 222</p>
                </li>
            </ul>
        </div>

        <div className='mr-10  my-20 p-10 border rounded-xl w-[50%]'>

                <h2 className='text-4xl font-semibold '>Got a Idea? We've got the skills. Let's team up</h2>
                <p className='py-6 text-gray-400'>Tell us more about yourself and what you're got in mind.</p>

                <form className="">

<div className='flex justify-between' >

   <div className="flex flex-col pb-6 w-[45%]">
    <label htmlFor="" className="py-2 text-gray-400">First Name </label>
    <input type="text" className="p-2 w-full  bg-slate-700 rounded-md border-b" placeholder='Enter first name' /> 
   </div>
   <div className="flex flex-col w-[45%]">
   <label htmlFor="" className="py-2 text-gray-400">Last Name</label>
    <input type="text" className="p-2 w-full bg-slate-700 rounded-md border-b" placeholder='Enter last name' />
   
   </div>
</div>

<div className="flex justify-between pb-6 ">
<div className="flex flex-col w-[45%]">
    <label className='text-gray-400 pb-2' htmlFor="">Email</label>
    <input type="email" className="w-full bg-slate-700 p-2 rounded-md border-b" placeholder='Enter email address' />
</div>

<div className="flex flex-col w-[45%]">
    <label className='text-gray-400 pb-2' htmlFor="">Phone Number</label>
    <input type="text" className="w-full bg-slate-700 p-2 rounded-md border-b" placeholder='01234 56789' />
</div>
</div>

<div className="flex flex-col">
    <label className='text-gray-400 pb-2' htmlFor="">Message</label>
    <textarea className="bg-slate-600 p-2 rounded-xl border-b" placeholder="Enter your message here" rows={7} cols={51}></textarea>
</div>

<button className="bg-yellow-500 p-2 w-full text-center text-black rounded-md hover:scale-95 transition-all duration-300 ease-in-out my-6 font-semibold">Send Message</button>

</form>

        </div>
      
    </div>
  )
}

export default Contact
