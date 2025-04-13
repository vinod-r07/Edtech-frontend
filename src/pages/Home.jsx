import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import { FaVideo } from "react-icons/fa6";
import { PiExamLight } from "react-icons/pi";
import { RiCodeBoxFill } from "react-icons/ri";
import { IoDiamond } from "react-icons/io5";

const Home = () => {
  const list = [
    {
      id: 1,
      title: "Free",
      content: [
        {
          id: 2,
          topic: "Learn HTML",
          data: "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.",
          info: 6,
        },
        {
          id: 3,
          topic: "Learn CSS",
          data: "This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques and various other features.",
          info: 6,
        },
        {
          id: 4,
          topic: "Responsive Web Design",
          data: "This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes",
          info: 6,
        },
      ],
    },
    {
      id: 5,
      title: "New to Coding",
      content: [
        {
          id: 6,
          topic: "JavaScript Basics",
          data: " Learn the fundamentals of JavaScript programming, including variables, data types, functions, control structures, and DOM manipulation.",
          info: 6,
        },
        {
          id: 7,
          topic: "Python for Beginners",
          data: "Dive into the world of Python programming, covering syntax, data structures, control flow, functions, and file handling.",
          info: 6,
        },
        {
          id: 8,
          topic: "Introduction to SQL",
          data: "Learn the fundamentals of SQL, including database structures, how to write SQL queries, and how to navigate the PostgreSQL database server.",
          info: 6,
        },
      ],
    },
    {
      id: 9,
      title: "Most Popular",
      content: [
        {
          id: 10,
          topic: "Mobile App Development",
          data: "Explore the fundamentals of mobile app development, covering UI design, navigation, data storage, and deployment for iOS and Android platforms.",
          info: 6,
        },
        {
          id: 11,
          topic: "Web Development with React",
          data: "Learn the fundamentals of React, including JSX, the Virtual DOM, props, state, event handling, and working with data and APIs.",
          info: 6,
        },
        {
          id: 12,
          topic: "CyberSecurity Essentials",
          data: "Learn the fundamentals of React, including JSX, the Virtual DOM, props, state, event handling, and working with data and APIs.",
          info: 6,
        },
      ],
    },
  ];

  const [cards, setCards] = useState(list[0]?.content);

  return (
    <div className="w-full relative   py-10 bg-[#000814]">
      <div className="flex mx-10 flex-col items-center">
        <p className="flex text-md font-semibold px-7 py-3 border rounded-4xl gap-4 items-center ">
          Become an instructor <FaArrowRightLong />{" "}
        </p>

        <h2 className="text-4xl py-4 font-bold">
          Empower Your Future With <span>Coding Skills</span>
        </h2>

        <h3 className="text-lg font-bold text-gray-500 ">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </h3>

        <div className="flex py-6 gap-5">
          <button className="flex text-black justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto transition-colors ease-linear duration-300  hover:bg-green-500 border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group">
            Explore
            <svg
              className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border  border-gray-700 group-hover:border-none p-2 rotate-45"
              viewBox="0 0 16 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                className="fill-gray-800 group-hover:fill-gray-800"
              ></path>
            </svg>
          </button>

          <button className="py-2 px-4 border rounded-4xl">Demo Classes</button>
        </div>
      </div>

      <div className="flex mx-10  justify-center pb-20">
        <video
          src="https://res.cloudinary.com/dmmflxlzp/video/upload/v1743592866/bannerVideo_uhvd2s.mp4"
          autoPlay
          muted
          loop
          width="600"
        />
      </div>

      <div className="my-10 mx-10  w-[40vw]">
        <h2 className="text-4xl pb-8 font-bold">
          Unlock Your coding potential with our online courses
        </h2>

        <h4 className="py-6 text-lg text-gray-500  font-semibold  ">
          Our courses are designed and taught by industry experts who have years
          of experience in coding and are passionate about sharing their
          knowledge with you.
        </h4>
        <div className="flex gap-10">
          <button className="px-4 py-3 flex rounded-lg text-black  items-center gap-4 bg-yellow-400">
            try it yourself <FaArrowRightLong />{" "}
          </button>
          <button className="px-4 py-3 rounded-lg bg-gray-700">
            Learn More
          </button>
        </div>
      </div>

      <div className="my-6 mx-10 ">live coding animation segment</div>

      <div className="my-6 mx-10 ">Most Popular Courses</div>

      <div className="my-6 mx-10 ">New Courses</div>

      <div className="my-6 mx-10  w-[39vw] relative left-[55%]">
        <h2 className="text-4xl font-bold py-4">Start coding in seconds</h2>
        <h3 className="text-md font-semibold py-8">
          Go ahead, give it a try. Our hands-on learning environment means
          you'll be writing real code from your very first lesson.
        </h3>
        <div className="flex justify-evenly">
          <button className="py-3 flex gap-4 items-center  px-4 rounded-lg border bg-yellow-500 text-black">
            Continue Lesson <FaArrowRightLong />{" "}
          </button>
          <button className="py-3 px-4 rounded-lg border bg-gray-600">
            Learn more
          </button>
        </div>
      </div>

      <div className="w-[54%] mx-10  relative left-[18%]">
        <h2 className="text-4xl font-semibold text-center">
          {" "}
          Unlock the Power of Code
        </h2>
        <p className="text-center">Learn to build anything you can imagine</p>

        <ul className="flex mx-5  justify-between bg-gray-600  p-1 rounded-4xl child-hover:bg-red-600 my-4">
          <li
            className="py-2 px-3 transition-colors ease-in-out duration-400 hover:cursor-pointer  hover:bg-[#000814] rounded-full "
            onClick={() => setCards(list[0]?.content)}
          >
            Free
          </li>

          <li
            className="py-2 px-3 transition-colors ease-in-out duration-400 hover:cursor-pointer  hover:bg-[#000814] rounded-full "
            onClick={() => setCards(list[1]?.content)}
          >
            New to coding
          </li>

          <li
            className="py-2 px-3 transition-colors ease-in-out duration-400 hover:cursor-pointer  hover:bg-[#000814] rounded-full "
            onClick={() => setCards(list[2]?.content)}
          >
            Most Popular
          </li>

          <li
            className="py-2 px-3 transition-colors ease-in-out duration-400 hover:cursor-pointer  hover:bg-[#000814] rounded-full "
            onClick={() => setCards(list[0]?.content)}
          >
            Skill paths
          </li>

          <li
            className="py-2 px-3 transition-colors ease-in-out duration-400 hover:cursor-pointer  hover:bg-[#000814] rounded-full "
            onClick={() => setCards(list[1]?.content)}
          >
            Career paths
          </li>
        </ul>

        <div className="flex justify-between w-full">

          {
          cards.map((card) => {

            return (
              <div
                key={card.id}
                className={` p-4 w-[40%]  
              ${ ( card.id == 2 || card.id === 6 || card.id === 10 || card.id === 14 ||  
                card.id=== 18 ) ? 'bg-white text-black' : 'bg-gray-700'
              }` } >
                <h3 className="font-semibold text-lg"> {card.topic} </h3>
                <p className=""> {card.data} </p>
                <span> -----------------------------------</span>
                <span> {card.info} Lessons </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white  flex justify-between mt-6 text-black p-4">
        <h2 className="w-[50%] text-4xl p-4 font-semibold">Get the Skills you need for a Job that is in demand</h2>
        <div className="w-[50%] p-4">
          
          <p>The modern StudyNotion is the dictates its own terms.</p>
          <p> Today, to be a
          competitive specialist requires more than professional skills.</p>

          <button className="bg-yellow-500 py-2 px-3 mt-8 rounded-lg font-semibold "> Learn more </button>

        </div>
      </div>

      <div className="flex px-10 py-20 pt-8 bg-white justify-between">
       
          <ul className="text-black  flex flex-col justify-evenly py-20 ">

            <li className="text-xl  flex gap-6 items-center"> <FaVideo className=""/>
              <div className="flex flex-col">  
                      <span className="font-semibold">Daily live classes</span>
                      <span>Lorem ipsum dolor sit amet consectetur.</span> 
              </div>
             </li>

            <li className="text-xl flex gap-6 items-center"> <PiExamLight className="text-2xl"/> 
                <div className="flex flex-col">  <span>Regular mock test</span><span>Lorem ipsum dolor sit amet consectetur.</span> </div> 
            </li>

            <li className="text-xl flex gap-6 items-center"> <IoDiamond className="text-2xl"/>  
                  <div className="flex flex-col"> <span>1:1 Mentor</span><span>Lorem ipsum dolor, sit amet consectetur adipisicing.</span> </div> 
            </li>

            <li className="text-xl flex gap-6 items-center"> <RiCodeBoxFill className="text-2xl"/>  
                    <div className="flex flex-col"> <span>Placement guidance</span>Lorem ipsum dolor sit amet consectetur.<span></span> </div> 
            </li>
          </ul>

        <div className="w-[60%]">
          <img src="https://res.cloudinary.com/dmmflxlzp/image/upload/v1744457906/image1_dkranl.png" alt="" />
        </div>

      </div>

      <div className="bg-white px-20   py-8 text-black">
        <div className="relative left-[10%] right-[10%] text-center w-[80%]">
        <h2 className=" text-4xl">Your Swiss Knife for learning any language</h2>
         
         <p className=" ">
         
         Using spin making learning multiple languages easy with 20+ languages
         realistic voice-over, progress tracking, custom schedule and more.
       </p>

       <button>Learn More</button>
        </div>
          
      </div>

      <div>
        <div className="bg-white flex w-[125vw] ">
          <img className="w-[70vw]  z-0" src="https://res.cloudinary.com/dmmflxlzp/image/upload/v1744480553/Know_your_progress.cf3ea1c51544985430d3_1_dyzl3t.png" alt="" />
          <img className="w-[90vw] top-[-15%] z-10 relative left-[-10%]" src="https://res.cloudinary.com/dmmflxlzp/image/upload/v1744480553/Compare_with_others.a849beb7dbec594a4f53_1_fo0uhv.png" alt="" />
          <img className="w-[80vw]  z-20 relative left-[-20%]" src="https://res.cloudinary.com/dmmflxlzp/image/upload/v1744480553/Plan_your_lessons.0848277c6ae4d27c3f30_1_q4mjbb.png" alt="" />
        </div>

        <div className="bg-white pt-6 pb-20 flex justify-center">
          <button className="bg-yellow-400 p-3  text-black rounded-lg "> learn more</button>
          </div>

          </div>

       <div className="flex p-10">
        <div>
          <img src="https://res.cloudinary.com/dmmflxlzp/image/upload/v1744480560/Instructor.8b4c4f204053f0dfe844_1_sfqpy6.png" alt="" />
        </div>

        <div className="flex flex-col justify-evenly px-20 w-[60%]">

<h2 className="text-3xl"> Become an <br/> Instructor</h2>
<h4 className="text-gray-500">
  Instructors from around the world teach millions of students on
  StudyNotion. We provide the tools and skills to teach what you love.
</h4>
<button className="flex items-center gap-4">
  Start learning Today <FaArrowRightLong />{" "}
</button>
</div>
       </div>
      

      <div>Reviews</div>
    </div>
  );
};

export default Home;
