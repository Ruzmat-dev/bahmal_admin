
import MaterialSymbolsAddShoppingCartRounded from '../icons/MaterialSymbolsAddShoppingCartRounded';
import MaterialSymbolsCategoryOutlineRounded from '../icons/MaterialSymbolsCategoryOutlineRounded';
import MaterialSymbolsHomeRepairServiceOutlineRounded from '../icons/MaterialSymbolsHomeRepairServiceOutlineRounded';
import MaterialSymbolsTeamDashboardOutline from '../icons/MaterialSymbolsTeamDashboardOutline';
import {
  IconLogout,
} from '@tabler/icons-react';
import classes from './NavbarSimpleColored.module.css';
import { Link, useLocation } from 'react-router-dom';
import MaterialSymbolsGalleryThumbnailOutlineRounded from '../icons/MaterialSymbolsGalleryThumbnailOutlineRounded';
import GameIconsAchievement from '../icons/GameIconsAchievement';
import CarbonBlog from '../icons/CarbonBlog';
import IonNewspaperOutline from '../icons/IonNewspaperOutline';
import MaterialSymbolsPerson from '../icons/MaterialSymbolsPerson';
import SolarUsersGroupTwoRoundedOutline from '../icons/SolarUsersGroupTwoRoundedOutline';
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
const mockdata = [
  { label: 'Dashbord', icon: MaterialSymbolsTeamDashboardOutline, link: "/dashbord" },
  { label: 'Categoryalar', icon: MaterialSymbolsCategoryOutlineRounded, link: "/categories" },
  { label: 'Yutuqlar', icon: GameIconsAchievement, link: "/achievements" },
  { label: 'Galereyalar', icon: MaterialSymbolsGalleryThumbnailOutlineRounded, link: "/galleries" },
  { label: 'Bloglar', icon: CarbonBlog, link: "/blog" },
  { label: 'Yangiliklar', icon: IonNewspaperOutline, link: "/news" },
  { label: 'Mahsulotlar', icon: MaterialSymbolsAddShoppingCartRounded, link: "/products" },
  { label: 'Xizmatlar', icon: MaterialSymbolsHomeRepairServiceOutlineRounded, link: "/services" },
  { label: 'Guruhlar', icon: MaterialSymbolsPerson, link: "/grup" },
  { label: 'Foydalanuvchilar', icon: SolarUsersGroupTwoRoundedOutline, link: "/users" },
];

export function NavbarNested() {
  const {pathname} = useLocation()
  

  const links = mockdata.map((item) => (
    <Link
      className={classes.link}
      data-active={pathname.includes(item.link) ? true : undefined}
      to={item.link}
      key={item.label}
    >
    <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Link>
  ));

  const openModal = () => modals.openConfirmModal({
    title: 'Please confirm your action',
    children: (
      <Text size="sm">
        This action is so important that you are required to confirm it with a modal. Please click
        one of these buttons to proceed.
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => console.log('Confirmed'),
  });



  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>

        {links}
      </div>
      <div className={classes.footer}>
        <Button className={classes.link} onClick={openModal}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
}