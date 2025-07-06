import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CustomBottomButtons from '@components/forms/CustomBottomButtons';
import CustomInput from '@components/forms/CustomInput';
import CustomInputDate from '@components/forms/CustomInputDate';
import CustomInputFiles from '@components/forms/CustomInputFiles';
import CustomSelect from '@components/forms/CustomSelect';
import CustomTextarea from '@components/forms/CustomTextarea';
import GridTwoColumns from '@components/common/GridTwoColumns';

import api from '@/config/api';
import fileApi from '@/config/fileApi';

import {
  Delivery,
  FilesController,
  initialStateFilesController,
  initialStatePlace,
  Place,
  ResponseData,
} from '@/constants/interfaces';

import { useUIStore } from '@/stores/uiStore';

import { API_ROUTES, WEB_ROUTES } from '@utils/routes';
import { apiDelete } from '@utils/apiDelete';
import { formatDateForInput, handleChange } from '@utils/forms';

const PlaceForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const setAlert = useUIStore((state) => state.setAlert);

  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [formData, setFormData] = useState<Place>(initialStatePlace);

  const [gallery, setGallery] = useState<FilesController>(
    initialStateFilesController,
  );
  const [mainImage, setMainImage] = useState<FilesController>(
    initialStateFilesController,
  );
  const [secondaryMedia, setSecondaryMedia] = useState<FilesController>(
    initialStateFilesController,
  );

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = (await api.get(API_ROUTES.delivery)) as ResponseData<
          Delivery[]
        >;

        if (response.statusCode !== 200) {
          console.error('Error fetching places:', response.message);
          setAlert('Error al obtener las entregas, intenta de nuevo');
          return;
        }

        setDeliveries(response.data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, []);

  useEffect(() => {
    const fetchPlace = async () => {
      if (!id) {
        return;
      }

      const response = (await api.get(
        API_ROUTES.placeById(id as string),
      )) as ResponseData<Place>;

      if (response.statusCode !== 200) {
        console.error('Error fetching place:', response);
        return;
      }

      setFormData({
        ...response.data,
        deliveryDate: formatDateForInput(response.data.deliveryDate),
      });

      setMainImage({
        existingFiles: response?.data?.mainImageUrl
          ? [response?.data?.mainImageUrl]
          : [],
        newFiles: [],
      });
      setSecondaryMedia({
        existingFiles: response?.data?.secondaryMedia
          ? [response?.data?.secondaryMedia]
          : [],
        newFiles: [],
      });
      setGallery({
        existingFiles: response?.data?.galleryMedia
          ? response?.data?.galleryMedia
          : [],
        newFiles: [],
      });
    };

    fetchPlace();
  }, [id]);

  const handleDelete = async () => {
    if (!formData._id) {
      setAlert('No se pudo eliminar el lugar, intenta de nuevo');
      return;
    }

    try {
      const deleted = await apiDelete('place', formData._id);

      if (!deleted) {
        setAlert('Error al eliminar el lugar, intenta de nuevo');
        return;
      }

      setAlert('Lugar eliminado correctamente');
      navigate(WEB_ROUTES.deliveries);
    } catch (error) {
      console.error('Error deleting place:', error);
      setAlert('Error al eliminar el lugar, intenta de nuevo');
    }
  };

  const handleRemoveFile = (file: File | string) => {
    if (typeof file === 'string') {
      setGallery((prev) => ({
        ...prev,
        existingFiles: prev.existingFiles.filter((f) => f.url !== file),
      }));
    } else {
      setGallery((prev) => ({
        ...prev,
        newFiles: prev.newFiles.filter((f) => f !== file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.deliveryId) {
        setAlert('Debes seleccionar una entrega');
        return;
      }

      const response = (await api.post(API_ROUTES.place, {
        ...formData,
        galleryMedia: gallery.existingFiles,
        id: formData._id,
        mainImageUrl: mainImage.existingFiles[0] || null,
        secondaryMedia: secondaryMedia.existingFiles[0] || null,
      })) as ResponseData<Place>;

      if (response.statusCode !== 201 || !response?.data?._id) {
        console.error('Error submitting place:', response.message);
        setAlert('Error al enviar el lugar, intenta de nuevo');
        return;
      }

      setAlert('Lugar creado correctamente, subiendo archivos...');
      navigate(WEB_ROUTES.placeById(response.data._id));

      const uploadMedia = await uploadPlaceMedia(response.data._id);
      if (!uploadMedia) {
        setAlert('Error al subir los archivos, intenta de nuevo');
        return;
      }

      setAlert('Archivos subidos correctamente');
      setFormData(initialStatePlace);
    } catch (error) {
      console.error('Error submitting delivery:', error);
    }
  };

  const uploadPlaceMedia = async (placeId: string): Promise<boolean> => {
    if (!mainImage && !secondaryMedia && !gallery) {
      return true;
    }

    const mediaFiles = new FormData();

    if (mainImage) {
      mediaFiles.append('mainImage', mainImage.newFiles[0]);
    }
    if (secondaryMedia) {
      mediaFiles.append('secondaryMedia', secondaryMedia.newFiles[0]);
    }
    if (gallery) {
      gallery.newFiles.forEach((file) => mediaFiles.append('gallery', file));
    }

    try {
      const response = await fileApi.post(
        API_ROUTES.placeMedia(placeId),
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

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <CustomSelect
        label="Entregas"
        required
        value={formData?.deliveryId}
        options={deliveries.map((delivery) => ({
          label: String(delivery.year),
          value: delivery?._id || '',
        }))}
        onChange={(value) => {
          handleChange({ name: 'deliveryId', value: value || '' }, setFormData);
        }}
      />

      <GridTwoColumns>
        <CustomInput
          label="Nombre del lugar"
          name="name"
          onChange={(e) => handleChange(e, setFormData)}
          placeholder="Nombre del lugar"
          required
          value={formData.name}
        />
        <CustomInputDate
          label="Fecha de la entrega"
          name="deliveryDate"
          onChange={(e) => handleChange(e, setFormData)}
          required
          value={formData.deliveryDate}
        />
      </GridTwoColumns>

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
          existingFiles={secondaryMedia.existingFiles}
          label="Arrastra o selecciona la imagen o video secundario"
          labelTitle="Imagen o video secundario"
          newFiles={secondaryMedia.newFiles}
          onFilesSelected={(files) =>
            setSecondaryMedia({ existingFiles: [], newFiles: files })
          }
          onRemoveFile={() => {
            setSecondaryMedia((prev) => ({
              ...prev,
              existingFiles: [],
            }));
          }}
        />
      </GridTwoColumns>

      <CustomInputFiles
        accept={{ 'image/*': ['.jpg', '.png'], 'video/*': ['.mp4'] }}
        existingFiles={gallery.existingFiles}
        label="Arrastra o selecciona las imagenes o videos de la galería"
        labelTitle="Galería"
        multiple
        newFiles={gallery.newFiles}
        onRemoveFile={handleRemoveFile}
        onFilesSelected={(files) =>
          setGallery((prev) => ({ ...prev, newFiles: files }))
        }
      />

      <CustomBottomButtons
        deleteAction={handleDelete}
        edit={Boolean(formData._id)}
      />
    </form>
  );
};

export default PlaceForm;
