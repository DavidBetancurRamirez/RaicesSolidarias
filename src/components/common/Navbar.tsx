import {
  Navbar as MtNavbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Button,
  Collapse,
} from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Moon, Slash, Sun, X } from 'lucide-react';

import Avatar from '@components/users/Avatar';

import { UserRoles } from '@/constants/roles';

import { useTheme } from '@hooks/useTheme';

import { useAuthStore } from '@/stores/authStore';

import { WEB_ROUTES } from '@utils/routes';

export const menuItems = [
  { link: WEB_ROUTES.about, name: 'Nosotros' },
  { link: WEB_ROUTES.contact, name: 'Contactenos' },
  { link: WEB_ROUTES.deliveries, name: 'Entregas' },
];

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 720 && setOpen(false),
    );
  }, []);

  const adminRouteIndex = menuItems.findIndex(
    (item) => item.link === WEB_ROUTES.admin,
  );

  if (user?.roles.includes(UserRoles.ADMIN)) {
    if (adminRouteIndex === -1) {
      menuItems.push({ link: WEB_ROUTES.admin, name: 'Administrar' });
    }
  } else {
    if (adminRouteIndex !== -1) {
      menuItems.splice(adminRouteIndex, 1);
    }
  }

  return (
    <MtNavbar
      className="bg-primary dark:bg-dk_primary px-4 py-6 border-none"
      fullWidth
    >
      <div className="flex items-center justify-between text-white gap-2">
        <div className="flex items-center gap-2">
          <Typography
            className="transition-colors duration-500 ease-in-out hover:text-text dark:hover:text-dk_text"
            variant="lead"
          >
            <Link to="/">Raices Solidarias</Link>
          </Typography>
          <Breadcrumbs
            className="bg-transparent hidden md:flex items-center p-2"
            separator={<Slash size={10} color="white" />}
          >
            {menuItems.map((item) => (
              <Typography
                className="transition-colors text-white duration-300 ease-in-out hover:text-text dark:hover:text-dk_text"
                key={item.name}
                variant="small"
              >
                <Link to={item.link}>{item.name}</Link>
              </Typography>
            ))}
          </Breadcrumbs>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {user?._id ? (
            <Avatar avatar={user.avatar} />
          ) : (
            <React.Fragment>
              <IconButton
                className="transition-colors bg-transparent shadow-none"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? <Moon /> : <Sun />}
              </IconButton>
              <Button
                className="bg-accent dark:bg-dk_accent text-card dark:text-dk_card"
                onClick={() => navigate(WEB_ROUTES.session)}
              >
                Ingresar
              </Button>
            </React.Fragment>
          )}
        </div>

        <div className="flex items-center md:hidden gap-2">
          {user?._id && <Avatar avatar={user.avatar} />}

          <IconButton
            size="sm"
            variant="text"
            color="white"
            onClick={handleOpen}
            className="inline-block md:hidden"
          >
            {open ? (
              <X className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
      </div>

      <Collapse open={open}>
        <div className="mt-6 rounded-xl">
          <ul className="mb-4 flex flex-col gap-3">
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
          <Button
            className="bg-accent dark:bg-dk_accent text-card dark:text-dk_card"
            fullWidth
            onClick={() =>
              user?._id ? logout() : navigate(WEB_ROUTES.session)
            }
          >
            {user?._id ? 'Cerrar Sesión' : 'Ingresar'}
          </Button>
        </div>
      </Collapse>
    </MtNavbar>
  );
};

export default Navbar;
