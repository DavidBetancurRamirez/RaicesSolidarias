import React from 'react';
import {
  Input,
  Typography,
  InputProps,
  Textarea,
  TextareaProps,
} from '@material-tailwind/react';

interface BaseProps {
  label: string;
}

type CustomInputProps =
  | (BaseProps & InputProps & { isTextarea?: false })
  | (BaseProps & TextareaProps & { isTextarea: true });

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  isTextarea = false,
  ...props
}) => {
  return (
    <div>
      <Typography className="mb-1 text-text dark:text-dk_text" variant="h6">
        {label}
      </Typography>

      {isTextarea ? (
        <Textarea
          className="!text-text dark:!text-dk_text !border-text dark:!border-dk_text"
          size="lg"
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = '')}
          {...(props as TextareaProps)}
        />
      ) : (
        <Input
          className="!text-text dark:!text-dk_text !border-text dark:!border-dk_text"
          size="lg"
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          {...(props as InputProps)}
        />
      )}
    </div>
  );
};

export default CustomInput;
