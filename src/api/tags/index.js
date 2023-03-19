import { axiosClient } from "../axiosInstance";

export const getTagsLists = async(page=0,limit=10,searchKey="")=>{
    const res = await axiosClient.get(`tags/list?page=${page}&limit=${limit}&search=${searchKey}`);
    return res;
}