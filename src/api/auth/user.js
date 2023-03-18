import { axiosClient } from "../axiosInstance"

export const userLogin = async(data)=>{
    const res = await axiosClient.post('user/login',data);
    return res;
}

export const userVerify = async(data)=>{
    const res = await axiosClient.post('user/verify',data);
    return res;
}