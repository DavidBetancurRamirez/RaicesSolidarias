import React from 'react';
import { Typography } from '@material-tailwind/react';

interface CustomLabelProps {
  label: string;
  required?: boolean;
}

const CustomLabel: React.FC<CustomLabelProps> = ({ label, required }) => {
  return (
    <Typography className="mb-1 text-text dark:text-dk_text" variant="h6">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </Typography>
  );
};

export default CustomLabel;
