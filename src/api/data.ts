import {  TCategory } from "../../types/data"
import { axiosPrivate } from "./axiosPrivate"
import { axiosPublic } from "./axiosPublic"

export const getCategories = async() => {
    try { 
        const res = await axiosPublic.get<TCategory[]>(`/categories/`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const postCategories = async(requestData: TCategory) => {
    try {
        const res = await axiosPrivate.post(`/categories/` , requestData)
        return res
    } catch(error) {
        console.log(error);
        
    }
}