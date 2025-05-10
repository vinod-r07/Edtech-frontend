import { createSlice } from "@reduxjs/toolkit";

const getAllCategory = () => {
    try {
        const category= localStorage.get("category")
        return category ? JSON.parse(category) : null;
    } catch (error) {
        return null
    }
}

const savedCategory= getAllCategory();

const initialState= {
    allCategory: savedCategory || []
}

const categorySlice= createSlice({
    name: "category",
    initialState,
    reducers: {
        setAllCategory (state, action)  {
            state.allCategory= action.payload
            localStorage.setItem("category", JSON.stringify(state.allCategory))
        },
        
    }
})


export const {setAllCategory}= categorySlice.actions;
export default categorySlice.reducer;