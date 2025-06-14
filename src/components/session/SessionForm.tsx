import React, { useState } from 'react';
import { Button, Card, CardHeader, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

import AvatarSelector from '@components/users/AvatarSelector';
import CustomInput from '@components/forms/CustomInput';
import CustomLabel from '@components/forms/CustomLabel';
import InputPassword from '@components/common/InputPassword';

import api from '@/config/api';

import { ResponseData, User } from '@/constants/interfaces';

import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

import { API_ROUTES, WEB_ROUTES } from '@utils/routes';
import { handleChange } from '@utils/forms';
import { validatePassword } from '@utils/validations';

const SessionForm = () => {
  const navigate = useNavigate();
  const setAlert = useUIStore((state) => state.setAlert);

  const [login, setLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    avatar: 'avatar1',
    checkPassword: '',
    email: '',
    password: '',
    userName: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const error = validateForm();

      if (error) {
        setAlert(error);
        return;
      }

      const response = (await api.post(
        API_ROUTES[login ? 'login' : 'register'],
        formData,
      )) as ResponseData<User>;

      if (response.statusCode !== 201) {
        setAlert('Error al enviar el formulario, intenta de nuevo');
        return;
      }

      useAuthStore.getState().setUser(response.data);

      setAlert(
        login
          ? 'Iniciaste sesión correctamente'
          : 'Te registraste correctamente',
      );

      // TODO: Go back or redirect to home
      navigate(WEB_ROUTES.home);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const validateForm = () => {
    const { email, password, checkPassword } = formData;

    if (!email || !password) {
      return 'Correo electronico y Contraseña son obligatorios';
    }

    if (!login && !validatePassword(password)) {
      return 'La contraseña debe tener al menos 6 caracteres, una mayúscula y un carácter especial';
    }

    if (!login && password !== checkPassword) {
      return 'Las contraseñas no coinciden';
    }
  };

  return (
    <Card className="w-fit p-4 rounded-xl bg-card dark:bg-dk_card">
      <CardHeader
        className="m-0 w-full"
        color="transparent"
        floated={false}
        shadow={false}
      >
        <Typography
          variant="h4"
          className="text-center text-text dark:text-dk_text"
        >
          {login ? 'Iniciar sesión' : 'Crear cuenta'}
        </Typography>
      </CardHeader>

      <form
        className="mt-4 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-1 flex flex-col gap-6">
          {!login && (
            <CustomInput
              label="Nombre de usuario"
              name="userName"
              onChange={(e) => handleChange(e, setFormData)}
              placeholder="Raices Solidarias"
              value={formData.userName}
            />
          )}

          <CustomInput
            autoComplete="on"
            label="Correo electronico"
            name="email"
            onChange={(e) => handleChange(e, setFormData)}
            placeholder="raices-solidarias@gmail.com"
            type="email"
            value={formData.email}
          />

          <InputPassword
            info={!login}
            label="Contraseña"
            name="password"
            onChange={(e) => handleChange(e, setFormData)}
            value={formData.password}
          />

          {!login && (
            <InputPassword
              info={false}
              label="Repetir contraseña"
              name="checkPassword"
              onChange={(e) => handleChange(e, setFormData)}
              value={formData.checkPassword}
            />
          )}

          {!login && (
            <div>
              <CustomLabel label="Avatar" />
              <AvatarSelector
                value={formData.avatar}
                onChange={(avatar) =>
                  setFormData((prev) => ({ ...prev, avatar }))
                }
              />
            </div>
          )}
        </div>

        <Button
          className="mt-6 text-white bg-primary dark:bg-dk_primary"
          fullWidth
          type="submit"
        >
          {login ? 'Iniciar sesión' : 'Crear cuenta'}
        </Button>
      </form>

      <Typography className="mt-3 text-center text-text dark:text-dk_text">
        {login ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
        <Button
          className="text-primary dark:text-dk_primary ml-2 px-2 py-2"
          onClick={() => setLogin((prev) => !prev)}
          type="button"
          variant="text"
        >
          {login ? 'Crea una cuenta' : 'Inicia sesión'}
        </Button>
      </Typography>
    </Card>
  );
};

export default SessionForm;
