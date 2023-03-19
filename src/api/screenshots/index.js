import { axiosClient } from "../axiosInstance";

export const getScreenshots = async(page=0,limit=10,searchKey="")=>{
    const res = await axiosClient.get(`screenshot/list?page=${page}&limit=${limit}&search=${searchKey}`);
    return res;
}