import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

import SafeMedia from '@components/common/SafeMedia';

import { WEB_ROUTES } from '@utils/routes';

interface DeliveryCircleProps {
  imageSrc?: string;
  year: string;
}

const DeliveryCircle: React.FC<DeliveryCircleProps> = ({ imageSrc, year }) => {
  return (
    <Link
      className="flex flex-col items-center gap-2"
      to={WEB_ROUTES.deliveryByYear(year)}
    >
      <SafeMedia
        alt={`Delivery ${year}`}
        className="!w-44 !h-44 !rounded-full"
        src={imageSrc}
      />
      <div className="py-1 bg-accent dark:bg-dk_accent rounded-lg text-center w-40">
        <Typography
          variant="h5"
          className="text-background dark:text-dk_background"
        >
          {`Entrega ${year}`}
        </Typography>
      </div>
    </Link>
  );
};

export default DeliveryCircle;
