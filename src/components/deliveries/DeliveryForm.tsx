import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CustomBottomButtons from '@components/forms/CustomBottomButtons';
import CustomInputFiles from '@components/forms/CustomInputFiles';
import CustomInputNumber from '@components/forms/CustomInputNumber';
import CustomTextarea from '@components/forms/CustomTextarea';
import GridTwoColumns from '@components/common/GridTwoColumns';
import StatisticsForm from '@components/statistics/StatisticsForm';

import api from '@/config/api';
import fileApi from '@/config/fileApi';

import { goals } from '@/constants/goals';
import {
  Delivery,
  FilesController,
  initialStateDelivery,
  initialStateFilesController,
  ResponseData,
} from '@/constants/interfaces';

import { useUIStore } from '@/stores/uiStore';

import { API_ROUTES, WEB_ROUTES } from '@utils/routes';
import { apiDelete } from '@utils/apiDelete';
import { handleChange } from '@utils/forms';

const DeliveryForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const setAlert = useUIStore((state) => state.setAlert);

  const [formData, setFormData] = useState<Delivery>(initialStateDelivery);

  // TODO: Refactor files controllers to reduce unnecessary rendering
  const [mainImage, setMainImage] = useState<FilesController>(
    initialStateFilesController,
  );
  const [tankYouMedia, setTankYouMedia] = useState<FilesController>(
    initialStateFilesController,
  );

  useEffect(() => {
    const fetchDelivery = async () => {
      if (!id) {
        return;
      }

      const response = (await api.get(
        API_ROUTES.deliveryById(id as string),
      )) as ResponseData<Delivery>;

      if (response.statusCode !== 200) {
        console.error('Error fetching delivery:', response);
        return;
      }

      setFormData(response.data);

      setMainImage({
        existingFiles: response?.data?.mainMedia
          ? [response?.data?.mainMedia]
          : [],
        newFiles: [],
      });

      setTankYouMedia({
        existingFiles: response?.data?.thankYou?.media
          ? [response?.data?.thankYou?.media]
          : [],
        newFiles: [],
      });
    };

    fetchDelivery();
  }, [id]);

  const uploadDeliveryMedia = async (deliveryId: string): Promise<boolean> => {
    if (!mainImage && !tankYouMedia) {
      return true;
    }

    const mediaFiles = new FormData();

    if (mainImage) {
      mediaFiles.append('mainImage', mainImage.newFiles[0]);
    }
    if (tankYouMedia) {
      mediaFiles.append('tankYouMedia', tankYouMedia.newFiles[0]);
    }

    try {
      const response = await fileApi.post(
        API_ROUTES.deliveryMedia(deliveryId),
        mediaFiles,
      );

      if (response.status !== 201) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error uploading media:', error);
      return false;
    }
  };

  const handleDelete = async () => {
    if (!formData._id) {
      setAlert('No se pudo eliminar la entrega, intenta de nuevo');
      return;
    }

    try {
      const deleted = await apiDelete('delivery', formData._id);

      if (!deleted) {
        setAlert('Error al eliminar la entrega, intenta de nuevo');
        return;
      }

      setAlert('Entrega eliminada correctamente');
      navigate(WEB_ROUTES.deliveries);
    } catch (error) {
      console.error('Error deleting delivery:', error);
      setAlert('Error al eliminar la entrega, intenta de nuevo');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = (await api.post(API_ROUTES.delivery, {
        ...formData,
        id: formData._id,
      })) as ResponseData<Delivery>;

      if (response.statusCode !== 201 || !response?.data?._id) {
        console.error('Error submitting delivery:', response.message);
        setAlert('Error al enviar la entrega, intenta de nuevo');
        return;
      }

      setAlert('Entrega creada correctamente, subiendo archivos...');
      navigate(WEB_ROUTES.deliveryByYear(String(response.data.year)));

      const uploadMedia = await uploadDeliveryMedia(response.data._id);
      if (!uploadMedia) {
        setAlert('Error al subir los archivos, intenta de nuevo');
        return;
      }

      setAlert('Archivos subidos correctamente');
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
        required
        value={Number(formData.year)}
        onChange={(value) => {
          console.log('value', value);
          handleChange({ name: 'year', value }, setFormData, true);
        }}
      />

      <CustomTextarea
        label="Descripción"
        name="description"
        placeholder="Descripción de la entrega"
        required
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

      <StatisticsForm
        arrayKey="goals"
        emptyMessage="No hay metas agregadas."
        label="Metas"
        options={goals}
        setState={setFormData}
        statistics={formData.goals}
      />

      <GridTwoColumns>
        <CustomInputFiles
          accept={{ 'image/*': ['.jpg', '.png'] }}
          existingFiles={mainImage.existingFiles}
          label="Arrastra o selecciona la imagen principal"
          labelTitle="Imagen principal"
          newFiles={mainImage.newFiles}
          onFilesSelected={(files) =>
            setMainImage({ existingFiles: [], newFiles: files })
          }
          onRemoveFile={() => {
            setMainImage((prev) => ({
              ...prev,
              existingFiles: [],
            }));
          }}
        />
        <CustomInputFiles
          accept={{ 'image/*': ['.jpg', '.png'], 'video/*': ['.mp4'] }}
          existingFiles={tankYouMedia.existingFiles}
          label="Arrastra o selecciona la imagen o video de agradecimiento"
          labelTitle="Imagen o video de agradecimiento"
          newFiles={tankYouMedia.newFiles}
          onFilesSelected={(files) =>
            setTankYouMedia({ existingFiles: [], newFiles: files })
          }
          onRemoveFile={() => {
            setTankYouMedia((prev) => ({
              ...prev,
              existingFiles: [],
            }));
          }}
        />
      </GridTwoColumns>

      <CustomBottomButtons
        deleteAction={handleDelete}
        edit={Boolean(formData._id)}
      />
    </form>
  );
};

export default DeliveryForm;
