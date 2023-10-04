import {  ScrollArea } from '@mantine/core';
import { LinksGroup } from './NavbarLinksGroup/NavbarLinksGroup';
import classes from './NavbarNested.module.css';
import MaterialSymbolsAddShoppingCartRounded from '../icons/MaterialSymbolsAddShoppingCartRounded';
import MaterialSymbolsCategoryOutlineRounded from '../icons/MaterialSymbolsCategoryOutlineRounded';
import MaterialSymbolsGalleryThumbnailOutlineRounded from '../icons/MaterialSymbolsGalleryThumbnailOutlineRounded';
import MaterialSymbolsNewsmodeOutlineRounded from '../icons/MaterialSymbolsNewsmodeOutlineRounded';
import MaterialSymbolsPerson from '../icons/MaterialSymbolsPerson';
import MaterialSymbolsHomeRepairServiceOutlineRounded from '../icons/MaterialSymbolsHomeRepairServiceOutlineRounded';
import MaterialSymbolsTeamDashboardOutline from '../icons/MaterialSymbolsTeamDashboardOutline';

const mockdata = [
  { label: 'Dashbord', icon: MaterialSymbolsTeamDashboardOutline , link: "/dashbord" },
  { label: 'Categoryalar', icon: MaterialSymbolsCategoryOutlineRounded , link: "/catalog"},
  {
    label: 'Galereya',
    icon: MaterialSymbolsGalleryThumbnailOutlineRounded,
    initiallyOpened: true,
    links: [
      { label: 'Yutuqlar', link: '/achievements' },
      { label: 'Galereyalar', link: '/galleries' },
    ],
  },
  {
    label: 'Yangilik',
    icon: MaterialSymbolsNewsmodeOutlineRounded,
    links: [
      { label: 'Bloglar', link: '/blog' },
      { label: 'Yangiliklar', link: '/news' },
    ],
  },
  { label: 'Mahsulotlar', icon: MaterialSymbolsAddShoppingCartRounded , link: "/products"},
  { label: 'Xizmatlar', icon: MaterialSymbolsHomeRepairServiceOutlineRounded , link: "/services"},
  {
    label: 'Foydalanuvchilar',
    icon: MaterialSymbolsPerson,
    links: [
      { label: 'Guruhlar', link: '/grup' },
      { label: 'Foydalanuvchilar', link: '/users' },
    ],
  },
];

export function NavbarNested() {
  const links = mockdata.map((item) => <LinksGroup key={item.label}
  label={item.label}
  icon={item.icon}
  link={item.link || ''} 
  initiallyOpened={item.initiallyOpened}
  links={item.links}  />);

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      
    </nav>
  );
}