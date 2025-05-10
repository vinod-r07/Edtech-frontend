import { apiConnector } from "./apiConnector";
import { profileUrls } from "./api";


const updateImage = async(token, formData) => {

    const UPDATE_PROFILE_PIC_API= profileUrls.UPDATE_PROFILE_PIC_API;
    const headers= {
        Authorization: `Bearer ${token}`
    }

    try {
        const res= await apiConnector("POST", UPDATE_PROFILE_PIC_API, formData, headers);
        console.log("response from profile dp update api : ", res);
        return { success: true, data: res?.data?.data, message: res?.data?.message || "Profile picture updated !!"}
    } catch (error) {
        console.log("error while updating profile pic : ", error);
        return { success: false,  message: "Something went wrong"}
    }
}

const updateData= async(token, formData) => {

    const UPDATE_PROFILE_DATA_API= profileUrls.UPDATE_PROFILE_DATA_API;
    const headers= {
        Authorization: `Bearer ${token}`
    }

    try {
        const res= await apiConnector("POST", UPDATE_PROFILE_DATA_API, formData, headers);
        console.log("response from profile data update api : ", res);
        return { success: true, message: res?.data?.message || "Profile data updated !!"}
    } catch (error) {
        console.log("error while updating profile pic : ", error);
        return { success: false, message: "Something went wrong"}
    }
}


export{
    updateData,
    updateImage
}