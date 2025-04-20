import { Button, Typography } from '@material-tailwind/react';
import { Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center justify-center mt-20">
      <Flag size="40" />
      <Typography
        variant="h1"
        color="blue-gray"
        className="mt-10 !text-3xl !leading-snug md:!text-4xl"
      >
        Error 404 <br /> Parece que algo salió mal.
      </Typography>
      <Typography className="mt-8 mb-10 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
        Parece que estas en una pestaña que no existe, verifica la URL o vuelve
        a la página de inicio.
      </Typography>
      <Button className="bg-primary" onClick={() => navigate('/')} size="lg">
        Volver al inicio
      </Button>
    </div>
  );
};

export default NotFound;
