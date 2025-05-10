import React, { useState } from 'react';
import { Eye, EyeOff, Info } from 'lucide-react';
import { Input, InputProps, Typography } from '@material-tailwind/react';

interface InputPasswordProps extends Omit<InputProps, 'type'> {
  info?: boolean;
  placeholder?: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({
  info = true,
  placeholder = '******',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div>
      <Input
        {...props}
        className={`!text-text dark:!text-dk_text !border-text dark:!border-dk_text ${props.className}`}
        placeholder={placeholder}
        size="lg"
        type={showPassword ? 'text' : 'password'}
        icon={
          showPassword ? (
            <Eye
              className="cursor-pointer text-text dark:text-dk_text"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          ) : (
            <EyeOff
              className="cursor-pointer text-text dark:text-dk_text"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          )
        }
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
      />
      {info && (
        <Typography
          className="mt-2 flex items-center gap-2 text-text dark:text-dk_text"
          variant="small"
        >
          <Info />
          Usa al menos 6 caracteres, una mayúscula y un carácter especial.
        </Typography>
      )}
    </div>
  );
};

export default InputPassword;
