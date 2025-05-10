import { apiConnector } from "./apiConnector";
import { courseUrls } from "./api";
import { categoryUrls } from "./api";


const createSection= async(token, courseId, section) => {

    const CREATE_SECTION_API= courseUrls.CREATE_SECTION_API;

    const headers= {
        Authorization: `Bearer ${token}`
    }

    const body= {
        courseId,
        section
    }

    try {
        const res= await apiConnector("POST", CREATE_SECTION_API, body, headers);
        console.log("result from create section api ", res);
        return { success: true, data: res?.data?.data, message: res?.data?.message}
    } catch (error) {
        console.log("error from create section api : ", error)
        return { success: false, data: null, message: "Something went wrong"};
    }

}

const uploadFile= async(token, sectionId, formData) => {
    
    const UPLOAD_FILE_TO_SECTION_API= `${courseUrls.UPLOAD_FILE_TO_SECTION_API}?sectionId=${sectionId}`;
    
    const headers= {
        Authorization: `Bearer ${token}`
    }
    

    try {
        const res= await apiConnector("POST", UPLOAD_FILE_TO_SECTION_API, formData, headers);
        console.log("result from upload file to section api ", res);
        return { success: true, data: res?.data?.data, message: res?.data?.message}
    } catch (error) {
        console.log("error from upload file to section : ", error)
        return { success: false, data: null, message: "Something went wrong"};
    }
}

const getCourseInfo= async( courseId) => {


    const GET_COURSE_INFO_PUBLIC= `${courseUrls.GET_COURSE_INFO_PUBLIC}?courseId=${courseId}`;


    try {
        const res= await apiConnector("GET", GET_COURSE_INFO_PUBLIC);
        console.log('course info : ', res);
        return { success: true, data: res.data?.data, message: res.data?.message}
    
    } catch (error) {
        console.log('Error from get course info : ', error);
        return { success: false, data: null, message: "Something went wrong"}
    
    }
}

const buyCourse= async(token, courseId) => {
    const headers= {
        Authorization: `Bearer ${token}`
    }
    console.log('request sending to backend')

    const ENROLL_IN_COURSE_API= courseUrls.ENROLL_IN_COURSE_API;

    try {
        const res= await apiConnector("POST", ENROLL_IN_COURSE_API, {courseId}, headers);
        console.log('response from enroll in course api : ', res);
        return {success: true, data: res?.data?.data, message: res?.data?.message || "Student enroll in course successfully !!"}
    } catch (error) {
        console.log("Something went wrong while enrollment in course : ", error);
        return {success: false}
    }
}

const addReview= async(token, formData) => {
    const ADD_COURSE_REVIEW_API= courseUrls.ADD_COURSE_REVIEW_API;

    const headers= {
        Authorization: `Bearer ${token}`
    }

    try {
        const res= await apiConnector("POST", ADD_COURSE_REVIEW_API, formData, headers)
        console.log("response from add course review : ", res);
        return { success: true, message: "Review added"}
    } catch (error) {
        console.log("error from add course review: ", error);
        return { success: false, message: "Something went wrong "}
    }
}

export {
      createSection,
      uploadFile,
      getCourseInfo,
      buyCourse,
      addReview
     }