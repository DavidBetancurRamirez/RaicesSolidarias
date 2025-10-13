import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Moon, Slash, Sun, X } from 'lucide-react';
import {
  Breadcrumbs,
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from '@material-tailwind/react';

import Avatar from '@components/users/Avatar';

import { menuItems } from '@/constants/menuItems';
import { UserRoles } from '@/constants/roles';

import { useTheme } from '@hooks/useTheme';

import { useAuthStore } from '@/stores/authStore';

import { WEB_ROUTES } from '@utils/routes';

const CustomNavbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { theme, toggleTheme } = useTheme();

  const location = useLocation();
  const navigate = useNavigate();

  const [menuItemsShow, setMenuItemsShow] = useState(menuItems);

  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 720 && setOpen(false),
    );
  }, []);

  // Show navbar on scroll up, hide on scroll down
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY <= 0) {
      setVisible(true);
    } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
      // scrolled down
      setVisible(false);
    } else if (currentScrollY < lastScrollY.current) {
      // scrolled up
      setVisible(true);
    }
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMenuItemsShow([
      ...menuItems,
      ...(user?.roles.includes(UserRoles.ADMIN)
        ? [{ link: WEB_ROUTES.adminDeliveries, name: 'Administrar' }]
        : []),
    ]);
  }, [user]);

  const handleGoToLogin = () => {
    navigate(WEB_ROUTES.session, {
      state: { from: location },
    });
  };

  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <Navbar
      className={`fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } !bg-primary dark:!bg-dk_primary px-4 py-6 border-none`}
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
            {menuItemsShow.map((item) => (
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
                onClick={handleGoToLogin}
              >
                Ingresar
              </Button>
            </React.Fragment>
          )}
        </div>

        <div className="flex items-center md:hidden gap-2">
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
            {menuItemsShow.map((item) => (
              <Typography
                as="li"
                className="transition-colors duration-300 ease-in-out hover:text-text dark:hover:text-dk_text"
                key={item.name}
                variant="small"
              >
                <Link to={item.link}>{item.name}</Link>
              </Typography>
            ))}
            <hr className="my-1 border-dashed" />
            <Typography
              as="li"
              className="transition-colors duration-300 ease-in-out"
              key="theme-toggle"
              onClick={toggleTheme}
              variant="small"
            >
              <IconButton
                className="transition-colors bg-transparent shadow-none mr-2"
                size="sm"
              >
                {theme === 'light' ? <Moon /> : <Sun />}
              </IconButton>
              {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
            </Typography>
          </ul>
          <Button
            className="bg-accent dark:bg-dk_accent text-card dark:text-dk_card"
            fullWidth
            onClick={() => (user?._id ? logout() : handleGoToLogin())}
          >
            {user?._id ? 'Cerrar Sesión' : 'Ingresar'}
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
