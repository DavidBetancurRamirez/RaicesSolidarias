import { useTheme } from '@hooks/useTheme';
import {
  Navbar as MtNavbar,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

import { WEB_ROUTES } from '@utils/routes';

export const menuItems = [
  { link: WEB_ROUTES.about, name: 'Nosotros' },
  { link: WEB_ROUTES.contact, name: 'Contactenos' },
  { link: WEB_ROUTES.deliveries, name: 'Entregas' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <MtNavbar className="bg-primary min-w-full m-0 px-4 py-6 rounded-none border-none shadow-none">
      <div className="flex flex-wrap items-center justify-between text-white">
        <Typography
          className="transition-colors duration-500 ease-in-out  hover:text-text dark:hover:text-dk_text"
          variant="lead"
        >
          <Link to="/">Raices Solidarias</Link>
        </Typography>

        <div className="flex items-center gap-8 lg:gap-12">
          <ul className="flex items-center gap-4 lg:gap-6">
            {menuItems.map((item) => (
              <Typography
                as="li"
                className="transition-colors duration-300 ease-in-out hover:text-text dark:hover:text-dk_text"
                key={item.name}
                variant="small"
              >
                <Link to={item.link}>{item.name}</Link>
              </Typography>
            ))}
          </ul>

          <IconButton
            className="transition-colors bg-transparent shadow-none"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Moon /> : <Sun />}
          </IconButton>
        </div>
      </div>
    </MtNavbar>
  );
};

export default Navbar;
