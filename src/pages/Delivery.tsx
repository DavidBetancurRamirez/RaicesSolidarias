import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CarouselContainer from '@components/CarouselContainer';
import GridTwoColumns from '@components/GridTwoColumns';
import PlaceCard from '@components/PlaceCard';
import SafeImage from '@components/SafeImage';
import Title from '@components/Title';

import api, { ResponseData } from '@/config/api';

import { Delivery, initialStateDelivery } from '@/constants/interfaces';

import { API_ROUTES } from '@utils/routes';

const DeliveryPage = () => {
  const { id } = useParams<{ id?: string }>();

  const [delivery, setDelivery] = useState<Delivery>(initialStateDelivery);

  useEffect(() => {
    const fetchDelivery = async () => {
      const response = (await api.get(
        API_ROUTES.deliveryByYear(id as string),
      )) as ResponseData<Delivery>;

      if (response.statusCode !== 200) {
        console.error('Error fetching delivery:', response);
        return;
      }

      setDelivery(response.data);
    };

    fetchDelivery();
  }, [id]);

  return (
    <div className="py-4 px-2 sm:px-4 md:px-6 lg:px-10 xl:px-16 flex flex-col gap-4 md:gap-6 xl:gap-8">
      <Title title={String(delivery.year)} />

      <GridTwoColumns>
        <SafeImage
          alt="Imagen principal de la entrega"
          className="w-full object-cover rounded-lg h-80"
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
