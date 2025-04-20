import { Button, Typography } from '@material-tailwind/react';
import { Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="flex flex-col items-center text-center">
        <Flag size="40" />
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl"
        >
          Error 404 <br /> Parece que algo salió mal.
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Parece que estas en una pestaña que no existe, verifica la URL o
          vuelve a la página de inicio.
        </Typography>
        <Button
          className="cursor-pointer w-full bg-primary px-4 md:w-[8rem] rounded-lg"
          color="red"
          onClick={() => navigate('/')}
          size="sm"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
