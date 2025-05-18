import React from 'react';
import { Textarea, TextareaProps } from '@material-tailwind/react';

import CustomLabel from './CustomLabel';

interface CustomTextareaProps extends TextareaProps {
  label: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({ label, ...props }) => {
  return (
    <div>
      <CustomLabel label={label} />
      <Textarea
        className="!text-text dark:!text-dk_text !border-text dark:!border-dk_text"
        size="lg"
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
        onFocus={(e) => (e.target.placeholder = '')}
        onBlur={(e) => (e.target.placeholder = '')}
        {...props}
      />
    </div>
  );
};

export default CustomTextarea;
