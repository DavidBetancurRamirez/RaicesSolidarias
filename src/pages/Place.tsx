import api from '@/config/api';
import { initialStatePlace, Place, ResponseData } from '@/constants/interfaces';
import GridTwoColumns from '@components/common/GridTwoColumns';
import PageLayout from '@components/common/PageLayout';
import SafeImage from '@components/common/SafeImage';
import Title from '@components/common/Title';
import { API_ROUTES } from '@utils/routes';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PlacePage = () => {
  const { id } = useParams<{ id?: string }>();

  const [place, setPlace] = useState<Place>(initialStatePlace);

  useEffect(() => {
    const fetchDelivery = async () => {
      const response = (await api.get(
        API_ROUTES.placeById(id as string),
      )) as ResponseData<Place>;

      if (response.statusCode !== 200) {
        console.error('Error fetching delivery:', response);
        return;
      }

      setPlace(response.data);
    };

    fetchDelivery();
  }, [id]);

  return (
    <PageLayout
      title={`${place.name} - ${new Date(place.deliveryDate).toLocaleDateString()}`}
    >
      <SafeImage
        alt="Imagen principal del lugar"
        className="h-[600px]"
        src={place.mainImageUrl}
      />

      <GridTwoColumns>
        <SafeImage
          alt="Imagen secundaria del lugar"
          className="!h-80"
          src={place.secondaryMediaUrl}
        />

        <div>
          <Title
            containerClassName="md:mb-2"
            variant="h4"
            title={`${place.name}`}
          />
          <p className="text-gray-700 dark:text-gray-300">
            {place.description}
          </p>
        </div>
      </GridTwoColumns>
    </PageLayout>
  );
};

export default PlacePage;
