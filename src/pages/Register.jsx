import React from 'react'

const Register = () => {
  return (
    <div>
        <form className="w-[50%] relative left-[25%] pb-24">

<div className='flex justify-between' >

   <div className="flex flex-col pb-4 w-[45%]">
    <label htmlFor="" className="py-2">First Name </label>
    <input type="text" className="p-2 w-full bg-slate-700 rounded-md border-b" placeholder='Enter first name' /> 
   </div>
   <div className="flex flex-col w-[45%]">
   <label htmlFor="" className="py-2">Last Name</label>
    <input type="text" className="p-2 w-full bg-slate-700 rounded-md border-b" placeholder='Enter last name' />
   
   </div>
</div>

<div className="flex justify-between pb-4 ">
<div className="flex flex-col w-[45%]">
    <label htmlFor="">Email</label>
    <input type="email" className="w-full bg-slate-700 p-2 rounded-md border-b" placeholder='Enter email address' />
</div>

<div className="flex flex-col w-[45%]">
    <label htmlFor="">Phone Number</label>
    <input type="text" className="w-full bg-slate-700 p-2 rounded-md border-b" placeholder='01234 56789' />
</div>
</div>

<div className="flex flex-col">
    <label htmlFor="">Message</label>
    <textarea className="bg-slate-600 p-2 rounded-xl border-b" placeholder="Enter your message here" rows={7} cols={51}></textarea>
</div>

<button className="bg-yellow-500 p-2 w-full text-center text-black rounded-md hover:scale-95 transition-all duration-300 ease-in-out my-6 font-semibold">Send Message</button>

</form>
    </div>
  )
}

export default Register
