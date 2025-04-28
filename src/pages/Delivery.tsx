import { Typography } from '@material-tailwind/react';

import CarouselContainer from '@components/CarouselContainer';
import PlaceCard from '@components/PlaceCard';
import Title from '@components/Title';

import { fakeDeliveries } from '@/data/deliveryFakeData';
import GridTwoColumns from '@components/GridTwoColumns';

const Delivery = () => {
  const delivery = fakeDeliveries[0];

  return (
    <div className="py-4 px-2 sm:px-4 md:px-6 lg:px-10 xl:px-16 flex flex-col gap-4 md:gap-6 xl:gap-8">
      <Title title={delivery.year} />

      <GridTwoColumns>
        <img
          className="w-full object-cover rounded-lg h-80"
          src={delivery.image}
        />
        <DeliveryDescription text={delivery.description} maxHeight="max-h-80" />
      </GridTwoColumns>

      <GridTwoColumns>
        <div className="flex flex-col gap-4">
          <Title
            containerClassName="md:mb-4"
            variant="h4"
            title={`Mensaje ${delivery.year}`}
          />
          <GridTwoColumns>
            <img
              className="w-full object-cover rounded-lg h-60"
              src={delivery.image}
            />
            <DeliveryDescription
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              maxHeight="max-h-60"
            />
          </GridTwoColumns>
        </div>

        <div className="bg-card dark:bg-dk_card rounded-lg p-4">
          <p className="text-text dark:text-dk_text">Estadísticas</p>
        </div>
      </GridTwoColumns>

      <CarouselContainer>
        {delivery.places.map((place, index) => (
          <PlaceCard
            key={index}
            date={new Date(place.date)}
            description={place.description}
            image={place.image}
            place={place.place}
          />
        ))}
      </CarouselContainer>
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

export default Delivery;
