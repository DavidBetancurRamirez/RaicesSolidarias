import React from 'react';
import { Select, Option, SelectProps } from '@material-tailwind/react';

import CustomLabel from './CustomLabel';
import { ChevronDown } from 'lucide-react';

interface CustomSelectProps extends Omit<SelectProps, 'children'> {
  emptyMessage?: string;
  label: string;
  options: { label: string; value: string | number }[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  emptyMessage = 'No hay opciones disponibles',
  label,
  options,
  ...props
}) => {
  return (
    <div>
      <CustomLabel label={label} />

      <Select
        arrow={<ChevronDown className="w-4 h-4 text-text dark:text-dk_text" />}
        className="!text-text dark:!text-dk_text !border-text dark:!border-dk_text"
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
        {...props}
      >
        {options.length === 0 ? (
          <div className="text-gray-500 text-sm mt-2">{emptyMessage}</div>
        ) : (
          options.map((option) => (
            <Option key={option.value} value={String(option.value)}>
              {option.label}
            </Option>
          ))
        )}
      </Select>
    </div>
  );
};

export default CustomSelect;
