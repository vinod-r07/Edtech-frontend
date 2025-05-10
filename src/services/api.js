 const BASE_URL = import.meta.env.VITE_BASE_URL;

// authentication
export const authUrls = {
    REGISTER_API                 : '/auth/register',
    LOGIN_API                    : '/auth/login',
    CHANGE_PASSWORD_API          : '/auth/change-password',
    REGENERATE_REFRESH_TOKEN_API : '/auth/regenerate-refresh-token',
    FORGET_PASSWORD_API          : '/auth/forget-password',
    DELETE_ACCOUNT_API           : '/auth/delete-account'
}

// profile
export const profileUrls = {
    UPDATE_PROFILE_PIC_API      : '/user/update-dp',
    UPDATE_PROFILE_DATA_API     : '/user/update-data'
}

// course 
export const courseUrls = {
    GET_MY_COURSE_API           : '/course/get-course',      // get all courses will be fetched by get all category api
    CREATE_SECTION_API          : '/course/create-section',
    UPLOAD_FILE_TO_SECTION_API  : '/course/upload-file',
    GET_COURSE_INFO             : '/course/course-info',
    GET_COURSE_INFO_PUBLIC      : '/course/course-info-public',
    ENROLL_IN_COURSE_API        : '/course/enroll-student',
    ADD_COURSE_REVIEW_API       : '/course/add-course-review',
}

// category
export const categoryUrls = {
    ADD_CATEGORY_API          : '/cat/add-category',
    GET_ALL_CATEGORY_API      : '/cat/categories',
    GET_SPECIFIC_CATEGORY_API : '/',
    ADD_COURSE_TO_CATEGORY    : '/cat/add-course',
}