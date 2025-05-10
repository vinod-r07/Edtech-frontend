import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";

const Catalog = () => {


  const allCategory= useSelector( state => state.category.allCategory);
  const [ courses, setCourses]= useState([]);
  const [ similarCourses, setSimilarCourses]= useState([]);

  const {category} = useParams();

  const CustomArrow = ({ onClick, direction }) => (
    <button 
      onClick={onClick}
      className={`absolute top-1/2 z-1000  cursor-pointer  text-4xl rounded-full shadow-lg ${
        direction === 'prev' ? '-left-3' : '-right-3'
      }`}
    >
      {direction === 'prev' ? <IoIosArrowDropleft/> : <IoIosArrowDropright/>}
    </button>
  );
  

  useEffect( () => {
      const data= allCategory.find( item => item.category === category);
      const similarData= allCategory
      .filter(item => item.category !== category)
      .map(item => item.content[0]);

      console.log('courses : ', data?.content);
      console.log('similar data : ', data)
      setCourses(data?.content)
      setSimilarCourses(similarData)
  }, [allCategory, category])

  // react-slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,          // ← Add this
    autoplaySpeed: 3000,     // ← And this (3 seconds)
    arrows: true,  
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" /> 
  };

  return (
    <div className='bg-slate-900'>
      
      <div className='bg-gray-600  p-10 relative pr-60'>
        <p>Home/Catalog/<span className='text-yellow-600'>{category}</span></p>
        <p className='text-2xl py-4'> {category} </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est beatae repudiandae dignissimos quis libero voluptate obcaecati aut, nulla magni quia.</p>
      </div>

      <div className='py-10 my-10'>
       <p className='flex gap-4 py-2 mx-10'> <span>Most popular</span><span>New</span> </p>
       <hr/>

        <div className='flex justify-between px-10 my-8 flex-wrap'>
            {
              courses && courses?.map( card => {
                return <div key={card?._id} className='w-[40%] group relative my-4  overflow-hidden'> 
                  <NavLink to={`/course/${card?._id}`} className=' '>
                    <img src={card?.image} alt={`${card?.title}`} className='w-full group-hover:scale-110 duration-300 
                    ease-out transition-all aspect-video' />
                    <div className='p-2 text-lg'>
                      <p className='font-semibold'> {card?.title} </p>
                      <p>By <span className='text-[#FFD60A] '>{card?.instructor?.fullName}</span> </p>
                      <p></p>
                      <p>₹ {card?.price} </p>
                    </div>
                  </NavLink>
                </div>
              })
            }
        </div>

       </div>

      <div className='my-8 mx-10'>
        <p className='text-2xl  font-semibold'>Similar Courses {category} </p>

        <div className="slider-container w-full  max-w-7xl  ">  
  <Slider {...settings} className=''>
  {similarCourses?.map((course) => (
      course && (
        <div key={course._id} className="w-full px-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <NavLink 
            to={`/course/${course._id}`} 
            className="block my-4 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="overflow-hidden rounded-lg">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3 space-y-2 bg-white dark:bg-gray-800">
              <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                By <span className="text-yellow-400">{course.instructor?.fullName}</span>
              </p>
              <p className="font-bold text-lg">₹{course.price}</p>
            </div>
          </NavLink>
        </div>
      )
    ))}
  </Slider>
    </div>
      </div>

    </div>
  )
}

export default Catalog


