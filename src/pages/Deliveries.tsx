import { useNavigate } from 'react-router-dom';

import DeliveryCard from '@components/DeliveryCard';
import Title from '@components/Title';

import { fakeData } from '@/data/deliveryFakeData';

import { WEB_ROUTES } from '@utils/routes';

const Deliveries = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full py-2 md:py-4 px-2 sm:px-4 md:px-6 lg:px-10 xl:px-16">
      <Title title="Entregas" />
      <div className="flex flex-wrap gap-4 md:gap-6 xl:gap-8">
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
