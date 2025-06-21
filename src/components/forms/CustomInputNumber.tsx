import React from 'react';
import { IconButton, Input, InputProps } from '@material-tailwind/react';
import { Minus, Plus } from 'lucide-react';

import CustomLabel from './CustomLabel';

interface CustomInputNumberProps
  extends Omit<InputProps, 'onChange' | 'value'> {
  label: string;
  max?: number;
  min?: number;
  onChange: (value: number) => void;
  required?: boolean;
  step?: number;
  value: number;
}

const CustomInputNumber: React.FC<CustomInputNumberProps> = ({
  label,
  max = Number.MAX_SAFE_INTEGER,
  min = Number.MIN_SAFE_INTEGER,
  onChange,
  required,
  step = 1,
  value,
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
      <CustomLabel label={label} required={required} />

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
            className: '!hidden',
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
