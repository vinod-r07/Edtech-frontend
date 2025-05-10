import {apiConnector} from "../services/apiConnector.js";
import { categoryUrls } from "../services/api.js";


export const addCategory=async (category) => {

    try {
        const res= await apiConnector("POST", categoryUrls.ADD_CATEGORY_API, {category});
        
        console.log("response : ", res);
        return {success: true, msg: "Category added successfuly !!"}
    } catch (error) {
        console.log("error while adding category : ", error);
        return {success: false, msg: "Category creation failed !!"};
    }

}


export const getAllCategory = async() => {
    try {
        const res = await apiConnector("GET", categoryUrls.GET_ALL_CATEGORY_API);
        console.log("response from get all category ", res)
        return { success: true, data: res?.data?.data};

    } catch (error) {
        return {success: false, data: null};
    }
}