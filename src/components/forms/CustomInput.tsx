import React from 'react';
import { Input, InputProps } from '@material-tailwind/react';

import CustomLabel from './CustomLabel';

export interface CustomInputProps extends InputProps {
  label: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  className,
  label,
  required,
  ...props
}) => {
  return (
    <div>
      <CustomLabel label={label} required={required} />

      <Input
        {...props}
        className={`!text-text dark:!text-dk_text !border-text dark:!border-dk_text label-required ${className ?? ''}`}
        required={required}
        size="lg"
        labelProps={{
          className: '!hidden',
        }}
      />
    </div>
  );
};

export default CustomInput;
