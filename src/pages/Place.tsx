import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';

import ButtonWithIcon from '@components/common/ButtonWithIcon';
import CustomTextarea from '@components/forms/CustomTextarea';
import Gallery from '@components/common/Gallery';
import GridTwoColumns from '@components/common/GridTwoColumns';
import PageLayout from '@components/common/PageLayout';
import SafeImage from '@components/common/SafeImage';
import Testimony from '@components/places/Testimony';
import Title from '@components/common/Title';

import api from '@/config/api';

import { initialStatePlace, Place, ResponseData } from '@/constants/interfaces';

import { useUIStore } from '@/stores/uiStore';

import { API_ROUTES } from '@utils/routes';

const PlacePage = () => {
  const { id } = useParams<{ id?: string }>();
  const setAlert = useUIStore((state) => state.setAlert);

  const [place, setPlace] = useState<Place>(initialStatePlace);
  const [testimonial, setTestimonial] = useState<string>('');
  const [showTestimonialForm, setShowTestimonialForm] =
    useState<boolean>(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!testimonial.trim()) return;

    try {
      const response = (await api.patch(
        API_ROUTES.placeTestimonial(place._id || ''),
        { testimonial },
      )) as ResponseData<Place>;

      if (response.statusCode !== 200) {
        console.error('Error adding testimonial:', response);
        setAlert('Error al agregar el testimonio, intenta de nuevo');
        return;
      }

      setAlert('Testimonio agregado correctamente');
      setPlace(response.data);
      setTestimonial('');
    } catch (error) {
      console.error('Error adding testimonial:', error);
      return;
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
      <Gallery gallery={place.galleryImageUrls} />

      <div className="flex justify-between items-center gap-2">
        <Title variant="h4" title="Testimonios" />
        <ButtonWithIcon
          icon={showTestimonialForm ? <ChevronUp /> : <ChevronDown />}
          onClick={() => setShowTestimonialForm((prev) => !prev)}
          text={
            showTestimonialForm ? 'Ocultar formulario' : 'Agregar testimonio'
          }
        />
      </div>

      {showTestimonialForm && (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <CustomTextarea
            label="Escribe un testimonio"
            name="testimonial"
            onChange={(e) => setTestimonial(e.target.value)}
            placeholder="Escribe un testimonio sobre este lugar"
            value={testimonial}
          />
          <ButtonWithIcon
            className="place-self-end"
            text="Agregar"
            icon={<Plus />}
            type="submit"
          />
        </form>
      )}

      {place.testimonials.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {place.testimonials.map((testimonial) => (
            <Testimony
              key={testimonial._id}
              createdBy={testimonial.createdBy}
              testimonial={testimonial.testimonial}
            />
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default PlacePage;
