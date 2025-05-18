import React from 'react';
import { Input, InputProps } from '@material-tailwind/react';

import CustomLabel from './CustomLabel';

interface CustomInputProps extends InputProps {
  label: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, ...props }) => {
  return (
    <div>
      <CustomLabel label={label} />
      <Input
        className="!text-text dark:!text-dk_text !border-text dark:!border-dk_text"
        size="lg"
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
