import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

import { menuItems } from './Navbar';

const Footer = () => {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-card dark:bg-dk-card p-6 text-text dark:text-dk-text text-center md:justify-between">
      <Typography>
        &copy; {new Date().getFullYear()} Raices solidarias.
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        {menuItems.map((item) => (
          <Typography
            as="li"
            className="transition-colors hover:text-text dark:hover:text-dk-text"
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
