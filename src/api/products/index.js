import { axiosClient } from "../axiosInstance";

export const getAllProducts = async(page=0,limit=10,searchKey="")=>{
    const res = await axiosClient.get(`website/products?page=${page}&limit=${limit}&search=${searchKey}`);
    return res;
}