import React, { useState } from 'react';
import { Moon, PowerOff, Sun, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar as MtAvatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';

import { useTheme } from '@hooks/useTheme';

import { useAuthStore } from '@/stores/authStore';

import { WEB_ROUTES } from '@utils/routes';

const Avatar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { theme, toggleTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const profileMenuItems = [
    {
      icon: User,
      label: 'Mi perfil',
      onClick: () => navigate(WEB_ROUTES.profile),
    },
    {
      icon: theme === 'light' ? Moon : Sun,
      label: theme === 'light' ? 'Modo oscuro' : 'Modo claro',
      onClick: toggleTheme,
    },
    {
      icon: PowerOff,
      label: 'Cerrar sesión',
      onClick: logout,
    },
  ];

  const closeMenu = (onClick?: () => void) => {
    if (onClick) onClick();
    setIsMenuOpen(false);
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center rounded-full p-0 border-none focus:outline-none focus:ring-0"
        >
          <MtAvatar
            size="sm"
            alt="user avatar"
            src="https://docs.material-tailwind.com/img/face-2.jpg"
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1 bg-card dark:bg-dk_card shadow-lg border-none">
        {profileMenuItems.map(({ label, icon, onClick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;

          return (
            <MenuItem
              key={label}
              onClick={() => closeMenu(onClick)}
              className={`flex items-center gap-2 rounded text-text dark:text-dk_text ${
                isLastItem
                  ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                  : 'hover:bg-primary dark:hover:bg-dk_primary'
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? 'red' : 'inherit'}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default Avatar;
