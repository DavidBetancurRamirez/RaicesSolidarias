import React, { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import { useNavigate, useParams } from 'react-router-dom';

import CarouselContainer from '@components/common/CarouselContainer';
import GridTwoColumns from '@components/common/GridTwoColumns';
import PageLayout from '@components/layout/PageLayout';
import PlaceCard from '@components/places/PlaceCard';
import SafeMedia from '@components/common/SafeMedia';
import StatisticsCard from '@components/statistics/StatisticsCard';
import Title from '@components/common/Title';

import api from '@/config/api';

import {
  DeliveryPlaces,
  initialStateDeliveryPlaces,
  ResponseData,
} from '@/constants/interfaces';

import { useAuthStore } from '@/stores/authStore';
import { UserRoles } from '@/constants/roles';

import { API_ROUTES, WEB_ROUTES } from '@utils/routes';
import AdminActions from '@utils/AdminActions';

const DeliveryPage = () => {
  const { id } = useParams<{ id?: string }>();

  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const [delivery, setDelivery] = useState<DeliveryPlaces>(
    initialStateDeliveryPlaces,
  );

  useEffect(() => {
    const fetchDelivery = async () => {
      const response = (await api.get(
        API_ROUTES.deliveryByYear(id as string),
      )) as ResponseData<DeliveryPlaces>;

      if (response.statusCode !== 200) {
        console.error('Error fetching delivery:', response);
        return;
      }

      setDelivery(response.data);
    };

    fetchDelivery();
  }, [id]);

  return (
    <PageLayout
      actions={AdminActions({
        editOnClick: () =>
          navigate(WEB_ROUTES.adminDeliveryById(String(delivery._id))),
        isAdmin: !!user && user.roles.includes(UserRoles.ADMIN),
      })}
      title={{
        button: {
          goTo: () => navigate(WEB_ROUTES.deliveries),
          text: 'Entregas',
        },
        title: String(delivery.year),
      }}
    >
      <GridTwoColumns>
        <SafeMedia
          alt="Imagen principal de la entrega"
          className="!h-80"
          media={delivery.mainMedia}
          fit="contain"
        />
        <DeliveryDescription text={delivery.description} maxHeight="max-h-80" />
      </GridTwoColumns>

      <GridTwoColumns>
        <div className="flex flex-col gap-4">
          <Title
            containerClassName="md:mb-2"
            variant="h4"
            title={`Mensaje ${delivery.year}`}
          />
          <DeliveryDescription
            text={delivery.thankYou.message}
            maxHeight="max-h-60"
          />
        </div>

        <SafeMedia
          alt="Imagen o video de agradecimiento"
          className="!h-80"
          media={delivery.thankYou.media}
          fit="contain"
        />
      </GridTwoColumns>

      <Title variant="h4" title="Estadisticas" />
      {delivery?.statistics?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {delivery.statistics.map((statistic, index) => (
            <StatisticsCard key={index} statistic={statistic} />
          ))}
        </div>
      ) : (
        <Typography className="text-text dark:text-dk_text">
          No hay estadísticas disponibles.
        </Typography>
      )}

      {delivery?.places?.length > 0 && (
        <React.Fragment>
          <Title variant="h4" title="Lugares de entrega" />
          <CarouselContainer>
            {delivery?.places.map((place, index) => (
              <PlaceCard
                date={new Date(place.deliveryDate)}
                description={place.description}
                key={index}
                media={place.mainMedia}
                place={place.name}
                onClick={() =>
                  navigate(WEB_ROUTES.placeById(String(place._id)))
                }
              />
            ))}
          </CarouselContainer>
        </React.Fragment>
      )}
    </PageLayout>
  );
};

const DeliveryDescription = ({
  text,
  maxHeight,
}: {
  text: string;
  maxHeight?: string;
}) => (
  <Typography
    className={`text-text dark:text-dk_text w-full text-justify overflow-y-auto pr-2 ${maxHeight}`}
    variant="paragraph"
  >
    {text}
  </Typography>
);

export default DeliveryPage;
