import { useState } from 'react';
import { Button } from '@material-tailwind/react';

import CustomInput from '@components/forms/CustomInput';
import CustomInputNumber from '@components/forms/CustomInputNumber';
import CustomTextarea from '@components/forms/CustomTextarea';
import GridTwoColumns from '@components/common/GridTwoColumns';

import api from '@/config/api';
import fileApi from '@/config/fileApi';

import {
  Delivery,
  initialStateDelivery,
  ResponseData,
} from '@/constants/interfaces';

import { useUIStore } from '@/stores/uiStore';

import { API_ROUTES } from '@utils/routes';
import { handleChange } from '@utils/forms';

const DeliveryForm = () => {
  const setAlert = useUIStore((state) => state.setAlert);

  const [formData, setFormData] = useState<Delivery>(initialStateDelivery);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [tankYouMedia, setTankYouMedia] = useState<File | null>(null);

  const uploadDeliveryMedia = async (deliveryId: string): Promise<boolean> => {
    if (!mainImage && !tankYouMedia) {
      return true;
    }

    const mediaData = new FormData();

    if (mainImage) {
      mediaData.append('mainImage', mainImage);
    }
    if (tankYouMedia) {
      mediaData.append('tankYouMedia', tankYouMedia);
    }

    try {
      const response = await fileApi.post(
        API_ROUTES.deliveryMedia(deliveryId),
        mediaData,
      );

      if (response.status !== 201) {
        return false;
      }

      setMainImage(null);
      setTankYouMedia(null);

      return true;
    } catch (error) {
      console.error('Error uploading media:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = (await api.post(
        API_ROUTES.delivery,
        formData,
      )) as ResponseData<Delivery>;

      if (response.statusCode !== 201 || !response?.data?._id) {
        console.error('Error submitting delivery:', response.message);
        setAlert('Error al enviar la entrega, intenta de nuevo');
        return;
      }

      const uploadMedia = await uploadDeliveryMedia(response.data._id);
      if (!uploadMedia) {
        setAlert('Error al subir los archivos, intenta de nuevo');
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
      <CustomInputNumber
        label="Año"
        name="year"
        placeholder={new Date().getFullYear().toString()}
        type="number"
        value={Number(formData.year)}
        onChange={(value) =>
          handleChange({ name: 'year', value }, setFormData, true)
        }
      />
      <CustomTextarea
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
      <CustomTextarea
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
      <GridTwoColumns>
        <CustomInput
          accept="image/*"
          label="Imagen principal"
          name="mainImageUrl"
          type="file"
          onChange={(e) => setMainImage(e.target.files?.[0] || null)}
        />
        <CustomInput
          accept="image/*,video/*"
          label="Imagen o video de agradecimiento"
          name="thankYou.imageUrl"
          type="file"
          onChange={(e) => setTankYouMedia(e.target.files?.[0] || null)}
        />
      </GridTwoColumns>
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
