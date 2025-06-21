import React from 'react';
import { Textarea, TextareaProps } from '@material-tailwind/react';

import CustomLabel from './CustomLabel';

interface CustomTextareaProps extends TextareaProps {
  label: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  label,
  required,
  ...props
}) => {
  return (
    <div>
      <CustomLabel label={label} required={required} />

      <Textarea
        className="!text-text dark:!text-dk_text !border-text dark:!border-dk_text"
        id={props.id}
        labelProps={{
          className: '!hidden',
        }}
        autoComplete={props.autoComplete}
        name={props.name}
        onBlur={(e) => (e.target.placeholder = '')}
        onChange={props.onChange}
        onFocus={(e) => (e.target.placeholder = '')}
        placeholder={props.placeholder || ' '}
        required={required}
        size="lg"
        value={props.value}
      />
    </div>
  );
};

export default CustomTextarea;
