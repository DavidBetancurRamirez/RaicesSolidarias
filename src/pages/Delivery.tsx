import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CarouselContainer from '@components/common/CarouselContainer';
import GridTwoColumns from '@components/common/GridTwoColumns';
import PlaceCard from '@components/places/PlaceCard';
import SafeImage from '@components/common/SafeImage';
import Title from '@components/common/Title';

import api, { ResponseData } from '@/config/api';

import {
  DeliveryPlaces,
  initialStateDeliveryPlaces,
} from '@/constants/interfaces';

import { API_ROUTES } from '@utils/routes';
import PageLayout from '@components/common/PageLayout';

const DeliveryPage = () => {
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
      <div className="flex flex-col gap-4 md:gap-6 xl:gap-8">
        <GridTwoColumns>
          <SafeImage
            alt="Imagen principal de la entrega"
            className="w-full object-cover rounded-lg h-80"
            src={delivery.mainImageUrl}
          />
          <DeliveryDescription
            text={delivery.description}
            maxHeight="max-h-80"
          />
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
                  className="w-full object-cover rounded-lg h-60"
                  src={delivery.thankYou.imageUrl}
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
              className="w-full object-cover rounded-lg h-80"
              src={delivery.thankYou.imageUrl}
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
              />
            ))}
          </CarouselContainer>
        )}
      </div>
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
