import React from 'react';
import { Button, ButtonProps, Typography } from '@material-tailwind/react';

interface ButtonWithIconProps extends Omit<ButtonProps, 'children'> {
  text: string;
  icon: React.ReactNode;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  text,
  icon,
  ...props
}) => {
  return (
    <Button
      variant="outlined"
      {...props}
      className={`group flex items-center overflow-hidden bg-primary dark:bg-dk_primary text-white px-4 py-2 min-h-10 max-h-10 rounded-md transition-all duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-lg ${props.className}`}
    >
      <Typography
        variant="small"
        className="z-10 text-white dark:text-dk_text transition-all duration-300 group-hover:translate-x-2"
      >
        {text}
      </Typography>

      <div className="z-10 flex items-center justify-center w-6 h-6 ml-4 bg-white text-primary dark:text-dk_primary rounded-full transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110">
        {icon}
      </div>

      <div className="inset-0 bg-primary dark:bg-dk_primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </Button>
  );
};

export default ButtonWithIcon;
