import React, { useState } from 'react';
import { Eye, EyeOff, Info } from 'lucide-react';
import { InputProps, Typography } from '@material-tailwind/react';

import CustomInput from '@components/forms/CustomInput';

interface InputPasswordProps extends Omit<InputProps, 'type'> {
  info?: boolean;
  label?: string;
  placeholder?: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({
  info = true,
  label = 'Contraseña',
  placeholder = '******',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div>
      <CustomInput
        {...props}
        label={label}
        placeholder={placeholder}
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
