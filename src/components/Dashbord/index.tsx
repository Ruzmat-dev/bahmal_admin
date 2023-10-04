import { Card, Text, Button, Box } from '@mantine/core';
import classes from "./dashbord.module.css"
const DashbordPage = () => {
  return (
    <Box p={20} className={classes.dashbord}>
      <Card shadow="sm" padding="lg" className={classes.dashbord_card}   radius="md" withBorder>

        <Text className={classes.dashbord_title}>
          Mahsulotlar
        </Text>

        <Text className={classes.dashbord_number}>
          2000
        </Text>

        <Button className={classes.dashbord_btn} fullWidth mt="md" radius="md">
          Batafsil
        </Button>
      </Card>
    </Box>
  );
}

export default DashbordPage