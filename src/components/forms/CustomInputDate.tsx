import React, { useRef } from 'react';
import { Calendar } from 'lucide-react';

import CustomInput, { CustomInputProps } from './CustomInput';

const dateInputClass =
  '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:pointer-events-none';

interface CustomInputDateProps extends CustomInputProps {}

const CustomInputDate: React.FC<CustomInputDateProps> = (props) => {
  const { className, type: _type, ...rest } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCalendarClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.();
      inputRef.current.focus();
    }
  };

  return (
    <CustomInput
      {...rest}
      className={`${className ?? ''} ${dateInputClass}`}
      onClick={handleCalendarClick}
      inputRef={inputRef}
      type="date"
      icon={
        <button
          type="button"
          tabIndex={-1}
          onClick={handleCalendarClick}
          className="focus:outline-none"
        >
          <Calendar className="w-4 h-4 text-text dark:text-dk_text" />
        </button>
      }
    />
  );
};

export default CustomInputDate;
