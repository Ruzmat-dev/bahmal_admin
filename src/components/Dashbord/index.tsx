import { useEffect, useState } from "react"
import { Card, Text, Box } from '@mantine/core';
import classes from "./dashbord.module.css"
import { getAchievements, getBlogs, getCategories, getGalleries, getNews, getProducts, getStatistics } from '../../api/data';
import { TCategory, TAchievement, TBlogs, TGalleries, ProductResponse, TStatistics } from "../../../types/data";
import CountUp from 'react-countup';
import { Link } from "react-router-dom";
import MaterialSymbolsAddRounded from "../icons/MaterialSymbolsAddRounded";




const DashbordPage = () => {
  const [category, setCategory] = useState<TCategory[] | undefined>([]);
  const [achievement, setAchievement] = useState<TAchievement[] | undefined>([]);
  const [blog, setBlog] = useState<TBlogs[] | undefined>([]);
  const [galleri, setGalleri] = useState<TGalleries[] | undefined>([]);
  const [news, setNews] = useState<TBlogs[] | undefined>([]);
  const [product, setProduct] = useState<ProductResponse[] | undefined>([]);
  const [statistic, setStatistic] = useState<TStatistics[] | undefined>([]);

  const fetchData = async () => {
    try {
      const categorys = await getCategories()
      const achievements = await getAchievements()
      const blogs = await getBlogs()
      const galleries = await getGalleries()
      const newss = await getNews()
      const products = await getProducts()
      const statistics = await getStatistics()
      setCategory(categorys?.data);
      setAchievement(achievements?.data)
      setBlog(blogs?.data)
      setGalleri(galleries?.data)
      setNews(newss?.data)
      setProduct(products?.data)
      setStatistic(statistics?.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  
  const data = [
    { label: "Categoryalar", icon: "salom", color: "#CE9FFC", link: "/categories" , count: category},
    { label: "Yutuqlar", icon: "salom", color: "#94C15C", link: "/achievement" , count: achievement},
    { label: "Blog", icon: "salom", color: "#91A2C2", link: "/blog" , count: blog?.results},    // xato 
    { label: "Galereyalar", icon: "salom", color: "#F2C94C", link: "/galleries" , count: galleri}, 
    { label: "Yangiliklar", icon: "salom", color: "#7D6391", link: "/news" , count: news?.results},   // xato
    { label: "Mahsulotlar", icon: "salom", color: "#91A7FA", link: "/products" , count: product?.results}, // xato   
    { label: "Statistika", icon: "salom", color: "#6B5C6C", link: "/statistics" , count: statistic},    
  ]
  const cards = data.map((e) =>
    <Link
      className={classes.link}
      to={e.link}
      key={e.label}
    >
      <Card shadow="sm" padding="lg" className={classes.dashbord_card} bg={e.color} radius="md" withBorder>
        <div>
          <Text className={classes.dashbord_number}>
            <CountUp end={e.count?.length || 0} delay={80} />
          </Text>
          <Text className={classes.dashbord_title}>
            {e.label}
          </Text>
        </div>
        <div>
          <MaterialSymbolsAddRounded fontSize={42} color="#fff"/>
        </div>
      </Card>
    </Link>
  )


  return (
    <Box p={20} className={classes.dashbord}>
        <div className={classes.wrapper}>
      {cards}
        </div>
    </Box>
  );
}

export default DashbordPage