import React from 'react';
import { Select, Option, SelectProps } from '@material-tailwind/react';
import { ChevronDown } from 'lucide-react';

import CustomLabel from './CustomLabel';

interface CustomSelectProps extends Omit<SelectProps, 'children'> {
  emptyMessage?: string;
  label: string;
  options: { label: string; value: string }[];
  required?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  emptyMessage = 'No hay opciones disponibles',
  label,
  options,
  required,
  ...props
}) => {
  return (
    <div>
      <CustomLabel label={label} required={required} />

      {options.length > 0 ? (
        <Select
          arrow={
            <ChevronDown className="w-4 h-4 text-text dark:text-dk_text" />
          }
          className="!text-text dark:!text-dk_text !border-text dark:!border-dk_text"
          labelProps={{ className: '!hidden' }}
          menuProps={{
            className:
              'bg-card dark:bg-dk_card text-text dark:text-dk_text !border-text dark:!border-dk_text',
          }}
          {...props}
          value={props.value ?? ''}
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      ) : (
        <div className="text-text dark:text-dk_text text-sm">
          {emptyMessage}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
