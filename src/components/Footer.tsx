import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

import { menuItems } from './Navbar';

import { WEB_ROUTES } from '@utils/routes';

const menuItemsUpdated = [
  {
    name: 'Principal',
    link: WEB_ROUTES.home,
  },
  ...menuItems,
];

const Footer = () => {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-card dark:bg-dk_card text-text dark:text-dk_text p-6 md:justify-between">
      <Typography variant="lead">
        &copy; {new Date().getFullYear()} Raices solidarias.
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        {menuItemsUpdated.map((item) => (
          <Typography
            as="li"
            className="transition-colors duration-300 ease-in-out hover:text-dk_text dark:hover:text-text"
            key={item.name}
            variant="small"
          >
            <Link to={item.link}>{item.name}</Link>
          </Typography>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
