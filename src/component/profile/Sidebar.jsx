import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setLogout } from "../../slice/userSlice";
import { FaRegUserCircle } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { GoCommentDiscussion } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import { tv } from "tailwind-variants";
import { MdComputer } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { VscDashboard } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const navLinkStyle = tv({
  base: "flex items-center my-2 cursor-pointer",
});

const Sidebar = () => {
  const userData = useSelector((state) => state.user.user);
  const role= userData.role;
  const isUserLoggedIn= useSelector( (state) => state.user.isLoggedIn)
  const dispatch = useDispatch();

  const navigate= useNavigate();

  useEffect( () => {
      if( !isUserLoggedIn )
        navigate('/login')
    }, [navigate, isUserLoggedIn])

  return (
    <div className="sticky">

      {/* Student Desktop sidebar */}

      {
        role === "Student" ? <div className=" min-h-screen border-r px-7 ">
        <ul className=" border-b py-10">
          <li>
           
            <NavLink to="/profile" className={navLinkStyle()}>
              
              <FaRegUserCircle className="text-xl" />
              <span className="pl-3">Profile</span>
            </NavLink>
          </li>
          <li>
            
            <NavLink to="/my-course" className={navLinkStyle()}>
              
              <GiGraduateCap className="text-xl" />
              <span className="pl-3">Enrolled courses</span>
            </NavLink>
          </li>
          <li>
            
            <NavLink to="/discussion" className={navLinkStyle()}>
              
              <GoCommentDiscussion className="text-xl" />
              <span className="pl-3">Discussion</span>
            </NavLink>
          </li>
        </ul>   
        
        <ul className="py-6 flex flex-col gap-y-5">
            <li> 
            <NavLink to="/setting" className={navLinkStyle()}>
              
              <IoSettingsOutline className="text-xl" />
              <span className="pl-3">Setting</span>
            </NavLink>  
            </li>
            <li> 
            <NavLink onClick={ () => dispatch(setLogout())} className={navLinkStyle()}>
              
              <CiLogout className="text-xl" />
              <span className="pl-3">Logout</span>
            </NavLink>
            </li>
        </ul>

      </div>
     
       : <div className="w-[20vw] min-h-screen border-r px-7 ">
        <ul className=" border-b py-10">
          <li>
           
            <NavLink to="/profile" className={navLinkStyle()}>
              
              <FaRegUserCircle className="text-xl" />
              <span className="pl-3">Profile</span>
            </NavLink>
          </li>
          <li>
            
            <NavLink to="/dashboard" className={navLinkStyle()}>
              
              <VscDashboard className="text-xl" />
              <span className="pl-3">Dashboard</span>
            </NavLink>
          </li>
          <li>
            
            <NavLink to="/my-course" className={navLinkStyle()}>
              
              <MdComputer className="text-xl" />
              <span className="pl-3">My Courses</span>
            </NavLink>
          </li>

          <li>
            
            <NavLink to="/add-course" className={navLinkStyle()}>
              
              <IoMdAdd className="text-xl" />
              <span className="pl-3">Add Course</span>
            </NavLink>
          </li>
        </ul>   
        
        <ul className="py-6 flex flex-col gap-y-5">
            <li> 
            <NavLink to="/setting" className={navLinkStyle()}>
              
              <IoSettingsOutline className="text-xl" />
              <span className="pl-3">Setting</span>
            </NavLink>  
            </li>
            <li className={navLinkStyle()}
            onClick={ () => {
              toast.success("user logged out")
               dispatch(setLogout())}
            }
            >
              
              <CiLogout className="text-xl" />
              <span className="pl-3">Logout</span>
            
            </li>
        </ul>

      </div>
      }

    </div>
  );
};

export default Sidebar;
