import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CarouselContainer from '@components/common/CarouselContainer';
import GridTwoColumns from '@components/common/GridTwoColumns';
import PageLayout from '@components/common/PageLayout';
import PlaceCard from '@components/places/PlaceCard';
import SafeImage from '@components/common/SafeImage';
import Title from '@components/common/Title';

import api from '@/config/api';

import {
  DeliveryPlaces,
  initialStateDeliveryPlaces,
  ResponseData,
} from '@/constants/interfaces';

import { API_ROUTES, WEB_ROUTES } from '@utils/routes';

const DeliveryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

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
    <PageLayout title={String(delivery.year)}>
      <GridTwoColumns>
        <SafeImage
          alt="Imagen principal de la entrega"
          className="!h-80"
          src={delivery.mainImageUrl}
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
          {delivery?.statistics?.length ? (
            <GridTwoColumns>
              <SafeImage
                alt="Imagen de agradecimiento"
                className="!h-60"
                src={delivery.thankYou.mediaUrl}
              />
              <DeliveryDescription
                text={delivery.thankYou.message}
                maxHeight="max-h-60"
              />
            </GridTwoColumns>
          ) : (
            <DeliveryDescription
              text={delivery.thankYou.message}
              maxHeight="max-h-60"
            />
          )}
        </div>

        {delivery?.statistics?.length ? (
          <div className="bg-card dark:bg-dk_card rounded-lg p-4">
            <p className="text-text dark:text-dk_text">Estadísticas</p>
          </div>
        ) : (
          <SafeImage
            alt="Imagen de agradecimiento"
            className="!h-80"
            src={delivery.thankYou.mediaUrl}
          />
        )}
      </GridTwoColumns>

      {delivery?.places && delivery?.places?.length > 0 && (
        <CarouselContainer>
          {delivery?.places.map((place, index) => (
            <PlaceCard
              key={index}
              date={new Date(place.deliveryDate)}
              description={place.description}
              image={place.mainImageUrl}
              place={place.name}
              onClick={() => navigate(WEB_ROUTES.placeById(String(place._id)))}
            />
          ))}
        </CarouselContainer>
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
