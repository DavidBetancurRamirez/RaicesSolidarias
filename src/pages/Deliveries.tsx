import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DeliveryCard from '@components/deliveries/DeliveryCard';
import PageLayout from '@components/layout/PageLayout';

import api from '@/config/api';

import { UserRoles } from '@/constants/roles';

import { Delivery, ResponseData } from '@/constants/interfaces';

import { useAuthStore } from '@/stores/authStore';

import { API_ROUTES, WEB_ROUTES } from '@utils/routes';
import AdminActions from '@utils/AdminActions';

const Deliveries = () => {
  const user = useAuthStore((state) => state.user);
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
    <PageLayout
      actions={AdminActions({
        addOnClick: () => navigate(WEB_ROUTES.adminDeliveries),
        isAdmin: !!user && user.roles.includes(UserRoles.ADMIN),
      })}
      title={{ title: 'Entregas' }}
    >
      <div className="flex flex-wrap gap-4 md:gap-6 xl:gap-8">
        {deliveries.map((data, index) => (
          <DeliveryCard
            key={index}
            year={Number(data.year)}
            description={data.description}
            imageUrl={data?.mainMedia?.url}
            reverse={index % 2 !== 0}
            onClick={() =>
              navigate(WEB_ROUTES.deliveryByYear(String(data.year)))
            }
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default Deliveries;
