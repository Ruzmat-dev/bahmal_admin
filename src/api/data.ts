import {  ProductResponse, TAchievement, TBlogs, TCategory, TGalleries, TStatistics } from "../../types/data";
import { axiosPublic } from "./axiosPublic";


export const getCategories = async() => {
    try { 
        const res = await axiosPublic("uz").get<TCategory[]>(`/categories/`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getAchievements = async() => {
    try { 
        const res = await axiosPublic("uz").get<TAchievement[]>(`/achievements/`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getBlogs = async() => {
    try { 
        const res = await axiosPublic("uz").get<TBlogs[]>(`/blogs/`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getGalleries = async() => {
    try { 
        const res = await axiosPublic("uz").get<TGalleries[]>(`/galleries/`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getNews = async() => {
    try { 
        const res = await axiosPublic("uz").get<TBlogs[]>(`/news/`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getProducts = async() => {
    try { 
        const res = await axiosPublic("uz").get<ProductResponse[]>(`/products/`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getStatistics = async() => {
    try { 
        const res = await axiosPublic("uz").get<TStatistics[]>(`/statistics/`)
        return res
    } catch (error) {
        console.log(error)
    }
}

