import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Input,
  Typography,
} from '@material-tailwind/react';

import InputPassword from './InputPassword';
import { API_ROUTES, WEB_ROUTES } from '@utils/routes';
import { useAuthStore, User } from '@/stores/authStore';
import { validatePassword } from '@utils/validations';
import api, { ResponseData } from '@/config/api';
import { useNavigate } from 'react-router-dom';

const SessionForm = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    checkPassword: '',
    email: '',
    password: '',
    userName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      validateForm();

      const response = (await api.post(
        API_ROUTES[login ? 'login' : 'register'],
        formData,
      )) as ResponseData<User>;

      if (response.statusCode !== 201) {
        throw new Error('Error al enviar el formulario');
      }

      useAuthStore.getState().setUser(response.data);

      navigate(WEB_ROUTES.home);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const validateForm = () => {
    const { email, password, checkPassword } = formData;

    if (!email || !password) {
      throw new Error('Correo electronico y Contraseña son obligatorios');
    }

    if (!validatePassword(password)) {
      throw new Error(
        'La contraseña debe tener al menos 6 caracteres, una mayúscula y un carácter especial',
      );
    }

    if (password !== checkPassword) {
      throw new Error('Las contraseñas no coinciden');
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
            <React.Fragment>
              <Typography
                className="-mb-3 text-text dark:text-dk_text"
                variant="h6"
              >
                Nombre de usuario
              </Typography>
              <Input
                className=" !text-text dark:!text-dk_text !border-text dark:!border-dk_text"
                name="userName"
                onChange={handleChange}
                placeholder="Raices Solidarias"
                size="lg"
                value={formData.userName}
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </React.Fragment>
          )}

          <Typography
            className="-mb-3 text-text dark:text-dk_text"
            variant="h6"
          >
            Correo electronico
          </Typography>
          <Input
            className=" !text-text dark:!text-dk_text !border-text dark:!border-dk_text"
            name="email"
            onChange={handleChange}
            placeholder="raices-solidarias@gmail.com"
            size="lg"
            type="email"
            value={formData.email}
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
          />

          <Typography
            className="-mb-3 text-text dark:text-dk_text"
            variant="h6"
          >
            Contraseña
          </Typography>
          <InputPassword
            info={!login}
            name="password"
            onChange={handleChange}
            value={formData.password}
          />

          {!login && (
            <React.Fragment>
              <Typography
                className="-mb-3 text-text dark:text-dk_text"
                variant="h6"
              >
                Repetir contraseña
              </Typography>
              <InputPassword
                info={false}
                name="checkPassword"
                onChange={handleChange}
                value={formData.checkPassword}
              />
            </React.Fragment>
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
