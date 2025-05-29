import React from 'react';
import { IconButton, Input, InputProps } from '@material-tailwind/react';
import { Minus, Plus } from 'lucide-react';

import CustomLabel from './CustomLabel';

interface CustomInputNumberProps
  extends Omit<InputProps, 'onChange' | 'value'> {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const CustomInputNumber: React.FC<CustomInputNumberProps> = ({
  label,
  value,
  onChange,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  ...props
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val)) {
      onChange(val);
    }
  };

  const handleIncrement = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  const handleDecrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  return (
    <div>
      <CustomLabel label={label} />
      <div className="relative w-full">
        <Input
          type="number"
          className="!text-text dark:!text-dk_text !border-text dark:!border-dk_text"
          size="lg"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          {...props}
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
        />
        <div className="absolute right-2 top-2.5 flex gap-1 items-center align-middle">
          <IconButton
            className="w-6 h-6 rounded bg-primary dark:bg-dk_primary"
            onClick={handleIncrement}
            type="button"
          >
            <Plus />
          </IconButton>
          <IconButton
            className="w-6 h-6 rounded bg-primary dark:bg-dk_primary"
            onClick={handleDecrement}
            type="button"
          >
            <Minus />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CustomInputNumber;
