import {  TCategory } from "../../types/data";
import { axiosPublic } from "./axiosPublic";


export const getCategories = async() => {
    try { 
        const res = await axiosPublic.get<TCategory[]>(`/categories/`)
        return res
    } catch (error) {
        console.log(error)
    }
}
