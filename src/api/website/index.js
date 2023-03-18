import { axiosClient } from "../axiosInstance";

export const getAllWebsites = async(page=0,limit=10,searchKey)=>{
    const res = await axiosClient.get(`website/list?page=${page}&limit=${limit}&search=${searchKey}`);
    return res;
}