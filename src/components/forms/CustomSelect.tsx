import React from 'react';
import { Select, Option, SelectProps } from '@material-tailwind/react';

import CustomLabel from './CustomLabel';

interface CustomSelectProps extends Omit<SelectProps, 'children'> {
  label: string;
  options: { label: string; value: string | number }[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  ...props
}) => {
  return (
    <div>
      <CustomLabel label={label} />

      <Select
        className="!text-text dark:!text-dk_text !border-text dark:!border-dk_text"
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
        {...props}
      >
        {options.map((option) => (
          <Option key={option.value} value={String(option.value)}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelect;
