import { apiConnector } from "../services/apiConnector";
import { authUrls } from "../services/api";
import { useDispatch } from "react-redux";

const RegisterUser = async( data ) => {

    try {  
        // making backend call
        const res= await apiConnector("POST", authUrls?.REGISTER_API, data)        
        return {success: true, data: res?.data?.data, msg: "User registered successfully !!"}
    } catch (error) {
        console.log("error at registering user : ", error);
        return { success: false, msg: "User is not registered !! Something went wrong"}
    }

}


const LoginUser= async(data) => {
    try {
        const LOGIN_API= authUrls.LOGIN_API;
    
        const response= await apiConnector("POST", LOGIN_API, data);
        return { success: true, data: response.data?.data, msg: "User logged in "};
    } catch (error) {
        console.error("error from login api : ", error);
        return { success: false, msg: "User logged in failed "}
    }
}

const ChangePassword= async(token, formData) => {
    
    const CHANGE_PASSWORD_API= authUrls.CHANGE_PASSWORD_API;
    
    const headers= {
        Authorization: `Bearer ${token}`
    }

    try {
        const res= await apiConnector("PATCH", CHANGE_PASSWORD_API, formData, headers);
        console.log("Response from update password : ", res);
        return { success: true, message: res?.data?.message || "Password updated successfully !!"}
    } catch (error) {
        console.log("Error while updating password : ", error);
        return { success: false, message: "Something went wrong"}
    }

}

const deleteAccount= async(token) => {
    const DELETE_ACCOUNT_API= authUrls?.DELETE_ACCOUNT_API;

    const headers= {
        Authorization: `Bearer ${token}`
    }

    try {
        const res= await apiConnector("POST", DELETE_ACCOUNT_API, null, headers);
        console.log("Response from delete account : ", res);
        return { success: true, message: res?.data?.message || "Account deleted successfully !!"};
    } catch (error) {
        console.log("Error from delete account : ", error);
        return { success: false, message:"Something went wrong"}
    }
}

const forgotPassword= async(token) => {

}

export {
    RegisterUser,
    LoginUser,
    ChangePassword,
    forgotPassword,
    deleteAccount
}