import {
  Button,
  Card,
  CardHeader,
  Input,
  Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';

import InputPassword from './InputPassword';

const SessionForm = () => {
  const [login, setLogin] = useState<boolean>(true);

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
      <form className="my-4 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          {!login && (
            <React.Fragment>
              <Typography
                variant="h6"
                className="-mb-3 text-text dark:text-dk_text"
              >
                Nombre de usuario
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </React.Fragment>
          )}
          <Typography
            variant="h6"
            className="-mb-3 text-text dark:text-dk_text"
          >
            Correo electronico
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
          />
          <Typography
            variant="h6"
            className="-mb-3 text-text dark:text-dk_text"
          >
            Contraseña
          </Typography>
          <InputPassword />
          {!login && (
            <React.Fragment>
              <Typography
                variant="h6"
                className="-mb-3 text-text dark:text-dk_text"
              >
                Repetir contraseña
              </Typography>
              <InputPassword info={false} />
            </React.Fragment>
          )}
        </div>

        <Button
          className="mt-6 text-white bg-primary dark:bg-dk_primary"
          fullWidth
        >
          {login ? 'Iniciar sesión' : 'Crear cuenta'}
        </Button>

        <Typography className="mt-4 text-center text-text dark:text-dk_text">
          {login ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
          <Button
            variant="text"
            className="text-primary dark:text-dk_primary px-3 py-2"
            onClick={() => setLogin((prev) => !prev)}
          >
            {login ? 'Crea una cuenta' : 'Inicia sesión'}
          </Button>
        </Typography>
      </form>
    </Card>
  );
};

export default SessionForm;
