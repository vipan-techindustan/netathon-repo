import { axiosClient } from "../axiosInstance";

const URL = 'dashboard/get-totals'

export const getTotalWebsitesCount = async()=>{
    const res = await axiosClient.get(URL);
    return res;
}

export const getTopFiveWebsite = async()=>{
    const res = await axiosClient.get(`dashboard/top-five`);
    return res;
}