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
        id={props.id}
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
        autoComplete={props.autoComplete}
        name={props.name}
        onBlur={(e) => (e.target.placeholder = '')}
        onChange={props.onChange}
        onFocus={(e) => (e.target.placeholder = '')}
        placeholder={props.placeholder || ' '}
        size="lg"
        value={props.value}
      />
    </div>
  );
};

export default CustomTextarea;
