import { useNavigate } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

import DeliveryCard from '@components/DeliveryCard';
import { fakeData } from '@/data/deliveryFakeData';
import { WEB_ROUTES } from '@utils/routes';

const Deliveries = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full py-2 md:py-4 px-4 md:px-6 lg:px-10 xl:px-16">
      <div className="py-1 bg-accent dark:bg-dk_accent w-fit rounded-md mb-4">
        <Typography
          variant="h3"
          className=" text-background dark:text-dk_background ml-2 mr-20"
        >
          Entregas
        </Typography>
      </div>
      <div className="flex gap-8 flex-wrap">
        {fakeData.map((data, index) => (
          <DeliveryCard
            key={index}
            year={data.year}
            description={data.description}
            imageSources={data.imageSources}
            fallbackImage={data.fallbackImage}
            reverse={index % 2 !== 0}
            buttonText={data.buttonText}
            onClick={() =>
              navigate(WEB_ROUTES.delivery.replace(':id', data.year))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Deliveries;
