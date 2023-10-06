import {useEffect , useState} from "react"
import { Card, Text, Button, Box } from '@mantine/core';
import classes from "./dashbord.module.css"
import { getCategories } from '../../api/data';
import { TCategory } from "../../../types/data";
import CountUp from 'react-countup';
import { Link } from "react-router-dom";
const DashbordPage = () => {
  const [category, setCategory] = useState<TCategory[] | undefined>([]);

  const fetchData = async () => {
    try {
      const res = await getCategories()
      setCategory(res?.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  // console.log(category?.length);
  

  return (
    <Box p={20} className={classes.dashbord}>
      <Card shadow="sm" padding="lg" className={classes.dashbord_card}   radius="md" withBorder>

        <Text className={classes.dashbord_title}>
          Mahsulotlar
        </Text>

        <Text className={classes.dashbord_number}>
           <CountUp end={category?.length || 0} delay={80}/>
        </Text>

        <Link to="/categories">
        <Button className={classes.dashbord_btn} fullWidth mt="md" radius="md">
          Batafsil
        </Button>
        </Link>
      </Card>
    </Box>
  );
}

export default DashbordPage