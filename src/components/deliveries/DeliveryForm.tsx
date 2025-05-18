import { useState } from 'react';
import { Button } from '@material-tailwind/react';

import CustomInput from '../common/CustomInput';

import api, { ResponseData } from '@/config/api';

import { Delivery, initialStateDelivery } from '@/constants/interfaces';

import { useUIStore } from '@/stores/uiStore';

import { API_ROUTES } from '@utils/routes';
import { handleChange } from '@utils/forms';

const DeliveryForm = () => {
  const setAlert = useUIStore((state) => state.setAlert);
  const [formData, setFormData] = useState<Delivery>(initialStateDelivery);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = (await api.post(
        API_ROUTES.delivery,
        formData,
      )) as ResponseData<Delivery>;

      if (response.statusCode !== 201) {
        console.error('Error submitting delivery:', response.message);
        setAlert('Error al enviar la entrega, intenta de nuevo');
        return;
      }

      setAlert('Entrega creada correctamente');
      setFormData(initialStateDelivery);
    } catch (error) {
      console.error('Error submitting delivery:', error);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <CustomInput
        label="Año"
        name="year"
        onChange={(e) => handleChange(e, setFormData, true)}
        placeholder={new Date().getFullYear().toString()}
        type="number"
        value={formData.year}
      />
      <CustomInput
        isTextarea
        label="Descripción"
        name="description"
        placeholder="Descripción de la entrega"
        value={formData.description}
        onChange={(e) =>
          handleChange(
            { name: 'description', value: e.target.value },
            setFormData,
          )
        }
      />
      <CustomInput
        isTextarea
        label="Mensaje de agradecimiento"
        name="mensaje"
        placeholder="Mensaje de agradecimiento"
        value={formData.thankYou.message}
        onChange={(e) =>
          handleChange(
            { name: 'thankYou.message', value: e.target.value },
            setFormData,
          )
        }
      />
      <Button
        className="bg-primary dark:bg-dk_primary text-white mt-2"
        fullWidth
        type="submit"
      >
        Guardar
      </Button>
    </form>
  );
};

export default DeliveryForm;
