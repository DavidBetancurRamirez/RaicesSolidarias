import { useTheme } from '@hooks/useTheme';
import {
  Navbar as MtNavbar,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import { WEB_ROUTES } from '@utils/routes';
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

export const menuItems = [
  { link: WEB_ROUTES.about, name: 'Nosotros' },
  { link: WEB_ROUTES.contact, name: 'Contactenos' },
  { link: WEB_ROUTES.deliveries, name: 'Entregas' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <MtNavbar
      className="bg-primary dark:bg-dk-primary w-full px-4 py-6"
      variant="filled"
    >
      <div className="flex flex-wrap items-center justify-between text-white">
        <Typography
          className="transition-colors hover:text-text dark:hover:text-dk-text"
          variant="lead"
        >
          <Link to="/">Raices Solidarias</Link>
        </Typography>

        <div className="flex items-center gap-8 lg:gap-12">
          <ul className="flex items-center gap-4 lg:gap-6">
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

          <IconButton
            className="cursor-pointer transition-colors hover:text-text dark:hover:text-dk-text"
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
