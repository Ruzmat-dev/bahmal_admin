import {
  ProductResponse,
  SubCategory,
  TAchievement,
  TBlogs,
  TBlogsResults,
  TCategory,
  TGalleries,
  TStatistics,
} from "../../types/data";
import { axiosPublic } from "./axiosPublic";

export const getCategories = async () => {
  try {
    const res = await axiosPublic("uz").get<TCategory[]>(`/categories/`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (id: string, lang: "ru" | "uz" | "en") => {
  try {
    const res = await axiosPublic(lang).get<TCategory>(`/categories/${id}/`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getSubCategory = async (id: string, lang: "ru" | "uz" | "en") => {
  try {
    const res = await axiosPublic(lang).get<SubCategory[]>(
      `/subcategories/?category=${id}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAchievements = async () => {
  try {
    const res = await axiosPublic("uz").get<TAchievement[]>(`/achievements/`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogs = async () => {
  try {
    const res = await axiosPublic("uz").get<TBlogs>(`/blogs/`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogById = async (id: string, lang: "ru" | "uz" | "en") => {
  try {
    const res = await axiosPublic(lang).get<TBlogsResults>(`/blogs/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getGalleries = async () => {
  try {
    const res = await axiosPublic("uz").get<TGalleries[]>(`/galleries/`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getNews = async () => {
  try {
    const res = await axiosPublic("uz").get<TBlogs>(`/news/`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getNewsById = async (id: string, lang: "ru" | "uz" | "en") => {
  try {
    const res = await axiosPublic(lang).get<TBlogsResults>(`/news/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const res = await axiosPublic("uz").get<ProductResponse>(`/products/`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getStatistics = async () => {
  try {
    const res = await axiosPublic("uz").get<TStatistics[]>(`/statistics/`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getStatisticsById = async (id:string, lang: "ru" | "uz" | "en") => {
  try {
    const res = await axiosPublic(lang).get<TStatistics>(`/statistics/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
