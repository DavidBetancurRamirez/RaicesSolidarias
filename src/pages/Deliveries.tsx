import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api, { ResponseData } from '@/config/api';

import { Delivery } from '@/constants/interfaces';

import DeliveryCard from '@components/DeliveryCard';
import Title from '@components/Title';

import { API_ROUTES, WEB_ROUTES } from '@utils/routes';

const Deliveries = () => {
  const navigate = useNavigate();

  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      const response = (await api.get(API_ROUTES.delivery)) as ResponseData<
        Delivery[]
      >;

      if (response.statusCode !== 200) {
        console.error('Error fetching deliveries:', response);
        return;
      }

      setDeliveries(response.data);
    };

    fetchDeliveries();
  }, []);

  return (
    <div className="py-4 px-2 sm:px-4 md:px-6 lg:px-10 xl:px-16">
      <Title containerClassName="mb-4" title="Entregas" />
      <div className="flex flex-wrap gap-4 md:gap-6 xl:gap-8">
        {deliveries.map((data, index) => (
          <DeliveryCard
            key={index}
            year={data.year}
            description={data.description}
            image={data?.mainImageUrl}
            reverse={index % 2 !== 0}
            onClick={() =>
              navigate(WEB_ROUTES.delivery.replace(':id', String(data.year)))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Deliveries;
