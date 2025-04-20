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
      className={`flex items-center bg-transparent p-0 ${props.className}`}
    >
      <Typography variant="small" className="text-text dark:text-dk_text m-1">
        {text}
      </Typography>
      <div className="text-white bg-primary dark:bg-dk_primary rounded-r-md p-1 ml-8">
        {icon}
      </div>
    </Button>
  );
};

export default ButtonWithIcon;
