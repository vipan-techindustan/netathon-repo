import { axiosClient } from "../axiosInstance";

export const getAllWebsites = async(page=0,limit=10,searchKey="")=>{
    const res = await axiosClient.get(`website/list?page=${page}&limit=${limit}&search=${searchKey}`);
    return res;
}

export const getSingleWebsiteDetail = async(id)=>{
    const res = await axiosClient.get(`website/details/${id}`);
    return res;
}

export const geEcomQueryList = async(page=0,limit=10,searchKey="")=>{
    const res = await axiosClient.get(`website/admin/all?page=${page}&limit=${limit}&search=${searchKey}`);
    return res;
}

export const updateEcomQuery = async(data)=>{
    const res = await axiosClient.post(`website/add-update`,data);
    return res;
}

export const deleteEcomQuery = async(id)=>{
    const res = await axiosClient.delete(`website/delete/${id}`);
    return res;
}