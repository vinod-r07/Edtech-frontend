import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slice/userSlice.js"
import categoryReducer from './slice/categorySlice.js';
import tokenReducer from "./slice/tokenSlice.js";
import courseReducer from './slice/courseSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    token: tokenReducer,
    course: courseReducer
  },
})

