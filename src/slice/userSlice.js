import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely get user from localStorage
const getSavedUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to parse user data", error);
    return null;
  }
};

const savedUser = getSavedUser();

const initialState = {
  user: savedUser || [],
  isLoggedIn: !!savedUser,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
     
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    enrollInCourse(state, action) {
      state.user.courses.push(action.payload);
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setLogout(state) {
      state.user = initialState.user; // Reset to initial structure
      state.isLoggedIn = false;
      localStorage.removeItem("user");
    },
    // Optional: Add a reducer to update user profile
    updateProfile(state, action) {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  },
});

// Export all action creators
export const { setUser, enrollInCourse, setLogout, updateProfile } = userSlice.actions;
export default userSlice.reducer;