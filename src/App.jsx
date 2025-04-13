
import './App.css';
import { Routes, Route } from "react-router-dom";

// import pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';

// import components
import Header from './component/Header';
import Footer from './component/Footer';
import Register from './pages/Register';


function App() {

  return (

     <div className='w-full '>
      <Header />

      <Routes >
            <Route path='/' element={<Home/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/login' element={ <Login/> } />
            <Route path='/register' element={<Register/>} />
            <Route path='/*' element={ <div className='bg-[#000814] p-28 text-2xl text-center min-h-screen font-semibold'> <p>404 Page not found</p> </div> } />
      </Routes>

      <Footer />

     </div>
  )
}

export default App
