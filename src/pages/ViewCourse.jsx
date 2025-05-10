import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom';
import { uploadFile, createSection } from '../services/courseFunc';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCourseInfo } from '../services/courseFunc';
import { apiConnector } from '../services/apiConnector';
import {  courseUrls } from '../services/api';
import WriteReview from '../component/course/WriteReview';

// icons
import { FaEdit } from 'react-icons/fa';
import { IoIosArrowBack } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";

const ViewCourse = () => {

  const dispatch= useDispatch();
  const navigate= useNavigate();

  const userData= useSelector( (state) => state.user.user );
  const isLoggedIn= useSelector( state => state.user.isLoggedIn);

  const[ review, setReview]= useState(false);

  const params= useParams();
  const courseId= params.courseId;

  useEffect( () => {
    if( !isLoggedIn)
      navigate('/login')
  }, [isLoggedIn])

  const [ content, setContent]= useState([]);

  const [ userAlreadyReview, setUserAlreadyReview]= useState([]);

  useEffect( () => {
      getCourseInfo();
  }, [courseId])

  const getCourseInfo= async() => {
    if( !userData || !courseId)
      return;

    const headers= {
      Authorization: `Bearer ${userData?.token}`
    }

    const GET_COURSE_INFO= `${courseUrls?.GET_COURSE_INFO}?courseId=${courseId}`
    
     try {
      const res= await apiConnector("GET", GET_COURSE_INFO, null, headers)
      console.log("result from get course api ", res);
      setContent(res.data?.data?.content)
      
      // Find the first file with a URL in any section
const firstFileWithUrl = res?.data?.data?.content
.flatMap(section => section.files)
.find(file => file);

if (firstFileWithUrl) {
setSelectedFile(firstFileWithUrl);
}

      const check= res.data?.data?.userRating.filter( item => item.userId === userData._id)
      setUserAlreadyReview(check)
  } catch (error) {
      console.log("error from get api : ", error)
  }
  }

  const [openIndex, setOpenIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedFileIndex, setExpandedFileIndex] = useState(null);

  const [ addFile, setAddFile] = useState(false);
  const [ addSection, setAddSection]= useState(false);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleFileClick = (file, fileIndex, sectionIndex) => {
    if( addFile ){
      setAddFile(false);
    }
    if( review) {
      setReview(false)
    }
    setSelectedFile(file);
    setExpandedFileIndex(expandedFileIndex === `${sectionIndex}-${fileIndex}` ? null : `${sectionIndex}-${fileIndex}`);
  };


  const {
    register,
    handleSubmit,
    watch,
    formState:{errors}
  }= useForm();

  // Your content array remains the same...
  const watchedFileType = watch("fileType");
  const [ sectionId, setSectionId]= useState("");

  const onSubmit= async(data) => {
    
    const formData= new FormData();

    formData.append("fileName", data.fileName);
    formData.append("file", data.file[0]);
    formData.append("fileType", data.fileType);

    if (data.file[0]?.size > 5 * 1024 * 1024) { // 5 MB in bytes
      toast.error("File size exceeds 5 MB limit");
      return;
    }

    console.log("section Id ", sectionId)

   const res= await uploadFile(userData?.token, sectionId, formData)
   if( res.success) {
     toast.success('File uploaded successfully !!');
     return
   }
   
   toast.error('Something went wrong');

  }

  const [ section, setSection]= useState("");

  const addSectionToCourse= async(e) => {

    e.preventDefault();

    if( !section || section.trim() === "" ){
      toast.error("Plz Enter Section Name")
      return ;
    }

    const res= await createSection( userData?.token, courseId, section);

    if( res.success) {
      toast.success('Section added to the course');
      setSection("");
      content.push(res?.data)
    }
    else{
      toast.error('Section is not added to the course')
    }

  }

  const ratingHandler= () => {
    setReview(true)
  }

  
  return (
    <div className='bg-slate-950 min-h-screen flex'>
      {/* Sidebar */}
      <div className='p-5 relative w-[28vw] border-r border-slate-700 overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <button className='p-3 bg-slate-700 rounded-full text-xl hover:bg-slate-600 transition'>
            <Link to="/my-course"><IoIosArrowBack /></Link>
          </button>
         { userData?.role === "Student" && <button onClick={ratingHandler} className='flex items-center gap-2 bg-yellow-400 py-2 px-3 rounded-lg cursor-pointer text-black font-semibold hover:bg-yellow-500 transition'>
            <span  >Review</span>
            <FaEdit className='text-xl' />
          </button>
}
        </div>

        <p className='my-3 text-xl font-semibold text-white'>My Courses</p>
        
        <div className='space-y-2 h-[70vh] overflow-y-scroll hide-scrollbar'>
          
          {  content.length !== 0 && content?.map((data, sectionIndex) => (
            <div key={sectionIndex}  className='bg-slate-800 rounded-md overflow-hidden'>
              <div 
                className='flex justify-between items-center p-3 cursor-pointer hover:bg-slate-700 transition'
                onClick={() => toggleDropdown(sectionIndex)}
              >
                <span className='font-medium text-white'>{data.title}</span>
                <IoMdArrowDropdown 
                  className={`text-xl transition-transform duration-200 text-white ${
                    openIndex === sectionIndex ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
              
              {openIndex === sectionIndex && (
                <div className='p-2 space-y-2'>
                  {data.files.map((file, fileIndex) => (
                    <div 
                      key={fileIndex}
                      onClick={() => handleFileClick(file, fileIndex, sectionIndex)}
                      className={`p-3 rounded-md cursor-pointer transition ${
                        expandedFileIndex === `${sectionIndex}-${fileIndex}` ? 
                        'bg-slate-600' : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                    >
                      <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                          {file.fileType === 'pdf' ? (
                            <MdOutlinePictureAsPdf className="text-red-500 text-lg" />
                          ) : (
                            <IoVideocamOutline className="text-blue-400 text-lg" />
                          )}
                          <span className='text-white'>{file.fileName}</span>
                        </div>
                        <span className='text-xs text-gray-300'>{file?.fileTiming}</span>
                      </div>
                      {expandedFileIndex === `${sectionIndex}-${fileIndex}` && (
                        <div className='mt-2 text-xs text-gray-400'>
                          Click to view {file.fileType === 'pdf' ? 'PDF' : 'video'}
                        </div>
                      )}
                    </div>
                  ))}

                { userData?.role === "Instructor" &&  <div 
                  onClick={ () => {setAddFile(!addFile); setSectionId(data?._id)}}
                  className={`flex items-center gap-2 cursor-pointer
                     p-2 rounded-lg hover:bg-slate-600 ${addFile ? "bg-slate-600" : "bg-slate-700"} `}>
                  <IoAddCircleOutline className='text-2xl' /> <span>Add File</span>
                    </div>
}

                </div>
              )}
            </div>
          ))}
         
         { userData?.role === "Instructor" && <div onClick={ () => setAddSection(!addSection) } 
              className={`flex items-center gap-2 cursor-pointer
                     p-2 rounded-lg hover:bg-slate-600 ${addSection ? "bg-slate-600" : "bg-slate-700"} `}>
                  <IoAddOutline className='text-2xl' /> <span>Add Section</span>
                    </div>
}

          { addSection && <div> 
            
            <form action="" onSubmit={addSectionToCourse} className='mt-2 mb-5'>
              <label htmlFor=""> Section Name<sup className='text-red-600'>*</sup></label>
              <input type="text" 
              placeholder='Enter Section Name' 
              className='p-2 bg-slate-800 rounded-lg border-b-2 border-slate-600 w-full my-1'
              value={ section }
              onChange={(e)=> setSection(e.target.value)} required />

              <button className='p-2 rounded-lg text-black bg-yellow-400 
              cursor-pointer w-full text-center font-semibold my-2'>Add Section</button>

            </form>

            </div>}
        </div>
      </div>

      {/* Main Content */}
      { !review ? ( <div className='p-5 flex-1'>
       {
         addFile ? ( <div className='w-full'>

<form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md mx-auto'>
    {/* File Type Selection */}
    <div className='my-4'>
      <label htmlFor="fileType" className='block mb-2 font-medium'>File Type *</label>
      <select
        id="fileType"
        className='w-full p-2 rounded bg-slate-800 border border-gray-600'
        {...register("fileType", { required: "File type is required" })}
      >
        <option value="" disabled>Select file type</option>
        <option value="pdf">PDF</option>
        <option value="mp4">Video (MP4)</option>
      </select>
      {errors.fileType && (
        <p className='mt-1 text-sm text-red-600'>{errors.fileType.message}</p>
      )}
    </div>

    {/* File Name */}
    <div className='my-4'>
      <label htmlFor="fileName" className='block mb-2 font-medium'>File Name *</label>
      <input
        id="fileName"
        type="text"
        {...register("fileName", { required: "File name is required" })}
        placeholder='Enter a descriptive name'
        className='w-full p-2 rounded bg-slate-800 border border-gray-600'
      />
      {errors.fileName && (
        <p className='mt-1 text-sm text-red-600'>{errors.fileName.message}</p>
      )}
    </div>

    {/* File Upload */}
    <div className='my-4'>
      <label htmlFor="fileUpload" className='block mb-2 font-medium'>
        {watchedFileType === "mp4" ? "Video File *" : "Document File *"}
      </label>
      <input
        id="fileUpload"
        type="file"
        {...register("file", { 
          required: "File is required",
          validate: {
            validType: (files) => {
              if (!files?.[0]) return true; // Let required handle empty case
              const file = files[0];
              if (watchedFileType === "mp4") {
                return file.type.startsWith("video/") || "Please upload a video file";
              } else {
                return file.type === "application/pdf" || "Please upload a PDF file";
              }
            }
          }
        })}
        accept={watchedFileType === "mp4" ? "video/*" : "application/pdf"}
        className='w-full p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-slate-700 file:text-white'
      />
      {errors.file && (
        <p className='mt-1 text-sm text-red-600'>{errors.file.message}</p>
      )}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className='w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors'
    >
      Upload File
    </button>
  </form>

           </div>) : (<div> 

        {selectedFile ? (
          selectedFile.fileType === "mp4" ? (
            <div className='h-full w-full m-4 flex flex-col'>
              <h2 className='text-xl font-semibold text-white mb-4'>{selectedFile.fileName}</h2>
              <div className='flex-1 bg-black rounded-lg overflow-hidden'>
                <video
                  src={`${selectedFile.fileUrl}`}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; '
                  title='video'
                  className='w-full '
                  controls controlsList='nodownload'
                />
              </div>
              <div className='mt-4 text-gray-300'>
                <p>Duration: {selectedFile.fileTiming}</p>
                
              </div>
            </div>
          ) : (
            <div className='h-full flex flex-col'>
              <h2 className='text-xl font-semibold text-white mb-4'>{selectedFile.fileName}</h2>
              <div className='flex-1 bg-gray-900 rounded-lg overflow-hidden flex flex-col'>
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(selectedFile.fileUrl)}&embedded=true`}
                  className='flex-1 w-full'
                  frameBorder='0'
                  title='pdf-viewer'
                />
                <div className='p-3 bg-gray-800 text-right'>
                  <a 
                    href={selectedFile.fileUrl} 
                    target='_blank' 
                    rel='noopener noreferrer'
                    className='text-blue-400 hover:underline'
                  >
                    Open in new tab
                  </a>
                </div>
              </div>
              <div className='mt-2 text-gray-300'>
                <p>Document Type: PDF</p>
              </div>
            </div>
          )
        ) : (
          <div className=' min-h-screen flex items-center justify-center text-gray-400'>
            <div className='text-center'>

              <p className='text-xl my-2'>Nothing to show here</p>
              <p className='text-xl  my-2'>Lectures will be uploaded soon...</p>
            </div>
          </div>
        )}
      </div>
         )
        }
    </div> ) : (
      <WriteReview token={userData?.token}  
      courseId={courseId} 
      userAlreadyReview={userAlreadyReview} 
      setReview={setReview} />
    ) 
    }
    </div>
  );
  
};

export default ViewCourse;