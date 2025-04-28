import { useNavigate } from 'react-router-dom';

import DeliveryCard from '@components/DeliveryCard';
import Title from '@components/Title';

import { fakeDeliveries } from '@/data/deliveryFakeData';

import { WEB_ROUTES } from '@utils/routes';

const Deliveries = () => {
  const navigate = useNavigate();

  return (
    <div className="py-4 px-2 sm:px-4 md:px-6 lg:px-10 xl:px-16">
      <Title containerClassName="mb-4" title="Entregas" />
      <div className="flex flex-wrap gap-4 md:gap-6 xl:gap-8">
        {fakeDeliveries.map((data, index) => (
          <DeliveryCard
            key={index}
            year={data.year}
            description={data.description}
            image={data.image}
            reverse={index % 2 !== 0}
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
