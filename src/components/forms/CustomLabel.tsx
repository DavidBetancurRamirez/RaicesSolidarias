import React from 'react';
import { Typography } from '@material-tailwind/react';

interface CustomLabelProps {
  label: string;
}

const CustomLabel: React.FC<CustomLabelProps> = ({ label }) => {
  return (
    <Typography className="mb-1 text-text dark:text-dk_text" variant="h6">
      {label}
    </Typography>
  );
};

export default CustomLabel;
