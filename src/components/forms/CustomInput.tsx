import React, { useRef } from 'react';
import { Input, InputProps } from '@material-tailwind/react';

import CustomLabel from './CustomLabel';
import { Calendar } from 'lucide-react';

interface CustomInputProps extends InputProps {
  label: string;
}

const dateInputClass =
  '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:pointer-events-none';

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  className,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCalendarClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.();
      inputRef.current.focus();
    }
  };

  const inputClassName =
    type === 'date' ? `${className ?? ''} ${dateInputClass}`.trim() : className;

  return (
    <div>
      <CustomLabel label={label} />
      <Input
        inputRef={inputRef}
        className={`!text-text dark:!text-dk_text !border-text dark:!border-dk_text ${inputClassName ?? ''}`}
        size="lg"
        type={type}
        icon={
          type === 'date' ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={handleCalendarClick}
              className="focus:outline-none"
            >
              <Calendar className="w-4 h-4 text-text dark:text-dk_text" />
            </button>
          ) : undefined
        }
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
        {...props}
      />
    </div>
  );
};

export default CustomInput;
