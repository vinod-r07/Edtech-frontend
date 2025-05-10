import { createSlice } from "@reduxjs/toolkit";

const getCourses= () => {
    try {
        const courses= localStorage.getItem("course");
        return courses ? JSON.stringify(courses) : null;
    } catch (error) {
        return null ;
    }
}

const savedCourse= getCourses();

const initialState= {
    myCourse: savedCourse || []
}

const courseSlice= createSlice({
    name: "course",
    initialState,
    reducers: {
        setCourse(state, action) {
            state.myCourse= action.payload;
            localStorage.setItem("course", JSON.stringify(state.myCourse))
        },
        addCourse(state, action) {
            state.myCourse.push(action.payload);
            localStorage.setItem("course", JSON.stringify(state.myCourse));
        },
        updateCourse(state, action) {
            
        },
        clearCourse(state, action) {

        },
        createSection(state, action)  {

        },
        addFile(state, action) {

        }
    }
})

export const {setCourse, 
    addCourse,
    updateCourse,
    clearCourse,
    createSection,
    addFile}= courseSlice.actions;
export default courseSlice.reducer;