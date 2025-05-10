
import './App.css';
import { Routes, Route } from "react-router-dom";

// import pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import Catalog from './pages/Catalog';
import Course from './pages/Course';
import Profile from './pages/Profile';
import MyCourse from './pages/MyCourse';
import Discussion from './pages/Discussion';
import ViewCourse from './pages/ViewCourse';
import AddCourse from './pages/AddCourse';
import Test from './pages/Test';
import EditProfile from './pages/EditProfile';
import Setting from './pages/Setting';
import Dashboard from './pages/Dashboard';

// import components
import Header from './component/Header';
import Footer from './component/Footer';
import Register from './pages/Register';

function App() {

  return (

     <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Header />

      <Routes >
            <Route path='/' element={<Home/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/login' element={ <Login/> } />
            <Route path='/register' element={<Register/>} />
            <Route path='/catalog/:category' element={<Catalog/>} />
            <Route path='/course/:courseId' element={ <Course/> } />
            <Route path="/profile" element={ <Profile/> } />
            <Route path="/my-course" element={ <MyCourse/> } />
            <Route path="/view-course/:courseId" element= { <ViewCourse/> } />
            <Route path="/discussion" element={ <Discussion/> } />
            <Route path="/add-course" element={ <AddCourse/> } />
            <Route path="/test" element={ <Test/>} />
            <Route path="/edit-profile" element={ <EditProfile/>} />
            <Route path="/setting" element={ <Setting/> } />
            <Route path="/dashboard" element={ <Dashboard/> } />
            <Route path='/*' element={ <div className='bg-[#000814] z-0 p-28 text-2xl text-center min-h-screen font-semibold'> 
              <p>404 Page not found</p> </div> } />
      </Routes>

      <Footer />

     </div>
  )
}

export default App
