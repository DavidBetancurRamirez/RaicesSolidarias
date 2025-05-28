import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Typography } from '@material-tailwind/react';

import ButtonWithIcon from '@components/common/ButtonWithIcon';
import CustomTextarea from '@components/forms/CustomTextarea';
import Testimony from '@components/places/Testimony';
import Title from '@components/common/Title';

import api from '@/config/api';

import {
  DeleteResponse,
  initialStateTestimonial,
  Place,
  ResponseData,
  Testimonial,
} from '@/constants/interfaces';
import { UserRoles } from '@/constants/roles';

import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

import { API_ROUTES } from '@utils/routes';
import { handleChange } from '@utils/forms';

interface TestimonialsProps {
  fetchTestimonials: () => void;
  place?: Place;
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({
  fetchTestimonials,
  place,
  testimonials,
}) => {
  const user = useAuthStore((state) => state.user);
  const setAlert = useUIStore((state) => state.setAlert);

  const [showForm, setShowForm] = useState<boolean>(false);
  const [testimonialForm, setTestimonialForm] = useState<Testimonial>(
    initialStateTestimonial,
  );

  const handleDeleteTestimonial = async (testimonialId?: string) => {
    const testimonialFound = testimonials.find((t) => t?._id === testimonialId);

    if (!testimonialFound || !testimonialFound?._id) {
      console.error('Testimonial not found');
      setAlert('Testimonio no encontrado, vuelve a cargar la página');
      return;
    }

    try {
      const response = (await api.delete(
        API_ROUTES.testimonialById(testimonialFound._id),
      )) as ResponseData<DeleteResponse>;

      if (response.statusCode !== 200) {
        console.error('Error adding testimonial:', response);
        setAlert('Error al agregar el testimonio, intenta de nuevo');
        return;
      }

      setAlert('Testimonio eliminado correctamente');
      setTestimonialForm(initialStateTestimonial);
      setShowForm(false);
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      setAlert('Error al eliminar el testimonio, intenta de nuevo');
      return;
    }
  };

  const handleEditTestimonial = (testimonialId?: string) => {
    const testimonialFound = testimonials.find((t) => t?._id === testimonialId);

    if (!testimonialFound) {
      console.error('Testimonial not found');
      setAlert('Testimonio no encontrado, vuelve a cargar la página');
      return;
    }

    setTestimonialForm(testimonialFound);
    setShowForm(true);
  };

  const handleShowForm = () => {
    if (!user) {
      // TODO: Change to modal
      setAlert('Debes iniciar sesión para agregar un testimonio');
      return;
    }

    if (showForm) {
      setTestimonialForm(initialStateTestimonial);
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!testimonialForm.message.trim()) return;

    try {
      const response = (await api.post(API_ROUTES.testimonial, {
        ...testimonialForm,
        id: testimonialForm?._id,
        place: place?._id,
      })) as ResponseData<Testimonial>;

      if (response.statusCode !== 201) {
        console.error('Error adding testimonial:', response);
        setAlert('Error al agregar el testimonio, intenta de nuevo');
        return;
      }

      setAlert('Testimonio agregado correctamente');
      setTestimonialForm(initialStateTestimonial);
      setShowForm(false);
      fetchTestimonials();
    } catch (error) {
      console.error('Error adding testimonial:', error);
      return;
    }
  };

  return (
    <React.Fragment>
      <div className="flex justify-between items-center gap-2">
        <Title variant="h4" title="Testimonios" />
        <ButtonWithIcon
          icon={showForm ? <ChevronUp /> : <ChevronDown />}
          onClick={handleShowForm}
          text={showForm ? 'Ocultar formulario' : 'Agregar testimonio'}
        />
      </div>

      {showForm && (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <CustomTextarea
            label="Escribe un testimonio"
            name="message"
            placeholder="Escribe un testimonio sobre este lugar"
            value={testimonialForm.message}
            onChange={(e) =>
              handleChange(
                { name: 'message', value: e.target.value },
                setTestimonialForm,
              )
            }
          />
          <ButtonWithIcon
            className="place-self-end"
            text="Agregar"
            icon={<Plus />}
            type="submit"
          />
        </form>
      )}

      {testimonials?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {testimonials.map((testimonial, index) => {
            const isAdmin = user?.roles.includes(UserRoles.ADMIN);
            const isOwner = user?._id === testimonial?.createdBy?._id;
            const canDelete = isAdmin || isOwner;

            return (
              <Testimony
                {...testimonial}
                key={`${testimonial?._id} - ${index}`}
                onEdit={
                  isOwner
                    ? () => handleEditTestimonial(testimonial?._id)
                    : undefined
                }
                onDelete={
                  canDelete
                    ? () => handleDeleteTestimonial(testimonial?._id)
                    : undefined
                }
              />
            );
          })}
        </div>
      ) : (
        <Typography className="text-text dark:text-dk_text">
          Aun no hay testimonios para este lugar. Sé el primero en agregar uno.
        </Typography>
      )}
    </React.Fragment>
  );
};

export default Testimonials;
