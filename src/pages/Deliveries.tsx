import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeliveryCard from '@components/deliveries/DeliveryCard';
import PageLayout from '@components/common/PageLayout';

import api from '@/config/api';

import { Delivery, ResponseData } from '@/constants/interfaces';

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
    <PageLayout title="Entregas">
      <div className="flex flex-wrap gap-4 md:gap-6 xl:gap-8">
        {deliveries.map((data, index) => (
          <DeliveryCard
            key={index}
            year={Number(data.year)}
            description={data.description}
            image={data?.mainImageUrl}
            reverse={index % 2 !== 0}
            onClick={() =>
              navigate(WEB_ROUTES.deliveriesById(String(data.year)))
            }
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default Deliveries;
