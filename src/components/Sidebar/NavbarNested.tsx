
import MaterialSymbolsAddShoppingCartRounded from '../icons/MaterialSymbolsAddShoppingCartRounded';
import MaterialSymbolsCategoryOutlineRounded from '../icons/MaterialSymbolsCategoryOutlineRounded';
import MaterialSymbolsHomeRepairServiceOutlineRounded from '../icons/MaterialSymbolsHomeRepairServiceOutlineRounded';
import MaterialSymbolsTeamDashboardOutline from '../icons/MaterialSymbolsTeamDashboardOutline';
import { useState } from 'react';
import {
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import classes from './NavbarSimpleColored.module.css';
import { Link } from 'react-router-dom';
import MaterialSymbolsGalleryThumbnailOutlineRounded from '../icons/MaterialSymbolsGalleryThumbnailOutlineRounded';
import GameIconsAchievement from '../icons/GameIconsAchievement';
import CarbonBlog from '../icons/CarbonBlog';
import IonNewspaperOutline from '../icons/IonNewspaperOutline';
import MaterialSymbolsPerson from '../icons/MaterialSymbolsPerson';
import SolarUsersGroupTwoRoundedOutline from '../icons/SolarUsersGroupTwoRoundedOutline';

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
  const [active, setActive] = useState('Billing');

  const links = mockdata.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
    <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>

        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}