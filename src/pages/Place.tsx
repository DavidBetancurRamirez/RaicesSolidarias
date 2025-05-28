import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Typography } from '@material-tailwind/react';

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
import { UserRoles } from '@/constants/roles';

import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

import { API_ROUTES, WEB_ROUTES } from '@utils/routes';

const PlacePage = () => {
  const { id } = useParams<{ id?: string }>();

  const user = useAuthStore((state) => state.user);
  const setAlert = useUIStore((state) => state.setAlert);

  const navigate = useNavigate();

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

  const handleDeleteTestimonial = (testimonialId: string) => {};

  const handleEditTestimonial = (testimonialId: string) => {};

  const handleShowForm = () => {
    if (!user) {
      navigate(WEB_ROUTES.session);
      setAlert('Debes iniciar sesión para agregar un testimonio');
      return;
    }

    setShowTestimonialForm((prev) => !prev);
  };

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
      setShowTestimonialForm(false);
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
      {place?.galleryImageUrls?.length > 0 ? (
        <Gallery gallery={place.galleryImageUrls} />
      ) : (
        <Typography className="text-text dark:text-dk_text">
          No hay imágenes disponibles en la galería.
        </Typography>
      )}

      <div className="flex justify-between items-center gap-2">
        <Title variant="h4" title="Testimonios" />
        <ButtonWithIcon
          icon={showTestimonialForm ? <ChevronUp /> : <ChevronDown />}
          onClick={handleShowForm}
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

      {place?.testimonials?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {place.testimonials.map((testimonial) => (
            <Testimony
              actions={
                user?.roles.includes(UserRoles.ADMIN) ||
                user?._id === testimonial.createdBy._id
              }
              createdBy={testimonial.createdBy}
              key={testimonial._id}
              onDelete={() => handleDeleteTestimonial(testimonial._id)}
              onEdit={() => handleEditTestimonial(testimonial._id)}
              testimonial={testimonial.testimonial}
            />
          ))}
        </div>
      ) : (
        <Typography className="text-text dark:text-dk_text">
          Aun no hay testimonios para este lugar. Sé el primero en agregar uno.
        </Typography>
      )}
    </PageLayout>
  );
};

export default PlacePage;
