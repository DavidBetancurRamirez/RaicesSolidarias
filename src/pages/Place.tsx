import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

import Gallery from '@components/common/Gallery';
import GridTwoColumns from '@components/common/GridTwoColumns';
import PageLayout from '@components/common/PageLayout';
import SafeImage from '@components/common/SafeImage';
import Testimonials from '@components/places/Testimonials';
import Title from '@components/common/Title';

import api from '@/config/api';

import {
  initialStatePlace,
  Place,
  ResponseData,
  Testimonial,
} from '@/constants/interfaces';

import { API_ROUTES } from '@utils/routes';

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

  const fetchTestimonials = async () => {
    if (!place?._id) return;

    try {
      const response = (await api.get(
        API_ROUTES.testimonialByPlace(place._id),
      )) as ResponseData<Testimonial[]>;

      if (response.statusCode !== 200) {
        console.error('Error fetching testimonials:', response);
        return;
      }

      setPlace((prevPlace) => ({
        ...prevPlace,
        testimonials: response.data,
      }));
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  return (
    <PageLayout
      title={`${place.name} - ${new Date(place.deliveryDate).toLocaleDateString()}`}
    >
      <SafeImage
        alt="Imagen principal del lugar"
        className="h-96 md:h-[600px]"
        src={place.mainImageUrl}
      />

      <GridTwoColumns reverseOnMobile>
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

      <Title variant="h4" title="Galeria de fotos" />
      {place?.galleryImageUrls?.length > 0 ? (
        <Gallery gallery={place.galleryImageUrls} />
      ) : (
        <Typography className="text-text dark:text-dk_text">
          No hay imágenes disponibles en la galería.
        </Typography>
      )}

      <Testimonials
        fetchTestimonials={fetchTestimonials}
        place={place}
        testimonials={place?.testimonials}
      />
    </PageLayout>
  );
};

export default PlacePage;
