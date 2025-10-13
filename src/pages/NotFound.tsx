import { Flag, House } from 'lucide-react';
import { Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

import ButtonWithIcon from '@components/common/ButtonWithIcon';

import { WEB_ROUTES } from '@utils/routes';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center justify-center mt-20 text-text dark:text-dk_text">
      <Flag size="50" />
      <Typography
        variant="h3"
        className="mt-8 !text-3xl !leading-snug md:!text-4xl"
      >
        Error 404 <br /> Parece que algo salió mal.
      </Typography>
      <Typography className="mt-8 mb-10 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
        Parece que estas en una pestaña que no existe, verifica la URL o vuelve
        a la página de inicio.
      </Typography>
      <ButtonWithIcon
        className="w-fit"
        text="Volver al inicio"
        icon={<House size={18} />}
        onClick={() => navigate(WEB_ROUTES.home)}
      />
    </div>
  );
};

export default NotFound;
