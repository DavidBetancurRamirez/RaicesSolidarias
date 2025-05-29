import React from 'react';
import { Button, ButtonProps, Typography } from '@material-tailwind/react';
import { ArrowRight } from 'lucide-react';

interface ButtonWithIconProps extends Omit<ButtonProps, 'children'> {
  text: string;
  icon?: React.ReactNode;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  text,
  icon = <ArrowRight />,
  ...props
}) => {
  return (
    <Button
      variant="filled"
      {...props}
      className={`group flex items-center justify-between bg-primary dark:bg-dk_primary text-white px-4 py-2 min-h-12 max-h-12 rounded-md transition-all duration-300 hover:opacity-90 hover:shadow-lg ${props.className}`}
    >
      <Typography
        variant="small"
        className="text-white dark:text-dk_text normal-case transition-transform duration-300 group-hover:translate-x-2"
      >
        {text}
      </Typography>

      <div className="flex items-center justify-center w-6 h-6 ml-4 bg-white text-primary dark:text-dk_primary rounded-full transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110">
        {icon}
      </div>
    </Button>
  );
};

export default ButtonWithIcon;
