
import MaterialSymbolsAddShoppingCartRounded from '../icons/MaterialSymbolsAddShoppingCartRounded';
import MaterialSymbolsCategoryOutlineRounded from '../icons/MaterialSymbolsCategoryOutlineRounded';
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
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import AkarIconsStatisticUp from '../icons/AkarIconsStatisticUp';
const mockdata = [
  { label: 'Dashbord', icon: MaterialSymbolsTeamDashboardOutline, link: "/dashbord" },
  { label: 'Categoryalar', icon: MaterialSymbolsCategoryOutlineRounded, link: "/categories" },
  { label: 'Yutuqlar', icon: GameIconsAchievement, link: "/achievements" },
  { label: 'Galereyalar', icon: MaterialSymbolsGalleryThumbnailOutlineRounded, link: "/galleries" },
  { label: 'Statistika', icon: AkarIconsStatisticUp, link: "/statistics" },
  { label: 'Bloglar', icon: CarbonBlog, link: "/blog" },
  { label: 'Yangiliklar', icon: IonNewspaperOutline, link: "/news" },
  { label: 'Mahsulotlar', icon: MaterialSymbolsAddShoppingCartRounded, link: "/products" },
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

    const removInLocalstorage = () => {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      window.location.reload();
    }

  const openModal = () => modals.openConfirmModal({
    title: 'Please confirm your action',
    centered: true,
    children: (
      <Text size="sm">
        Siz xaqiqatan ham chiqmoqchimisiz 
      </Text>
    ),
    labels: { confirm: 'Chiqish', cancel: 'Orqaga' },
    onConfirm: () => removInLocalstorage(),
  });



  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>

        {links}
      </div>
      <div className={classes.footer}>
        <Button className={classes.footerLink} onClick={openModal}>
          <IconLogout className={classes.footerLinkIcon} stroke={1.5} />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
}