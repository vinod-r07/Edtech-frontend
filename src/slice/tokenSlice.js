import { createSlice } from "@reduxjs/toolkit";

const getToken= () => {
    try {
        const token= localStorage.getItem("token");
        return token ? token: null;
    } catch (error) {
        return null
    }
}

const savedToken= getToken();

const initialState = {
    token: savedToken 
}

const tokenSlice= createSlice( {
    name: "token",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token= action.payload;
            localStorage.setItem("token", state.token)
        },
        clearToken(state, action) {
            state.token= null;
            localStorage.removeItem("token")
        }
    }
})

export const {setToken, clearToken}= tokenSlice.actions
export default tokenSlice.reducer