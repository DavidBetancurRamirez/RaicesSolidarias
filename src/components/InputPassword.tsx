import React, { useState } from 'react';
import { Input, InputProps, Typography } from '@material-tailwind/react';
import { Eye, EyeOff, Info } from 'lucide-react';

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
        className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${props.className}`}
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
        placeholder={placeholder}
        size="lg"
        type={showPassword ? 'text' : 'password'}
        labelProps={{
          className: 'before:content-none after:content-none',
        }}
      />
      {info && (
        <Typography
          variant="small"
          className="mt-2 flex items-center gap-2 text-text dark:text-dk_text"
        >
          <Info />
          Usa almenos 6 caracteres, una mayuscula y un caracter especial.
        </Typography>
      )}
    </div>
  );
};

export default InputPassword;
