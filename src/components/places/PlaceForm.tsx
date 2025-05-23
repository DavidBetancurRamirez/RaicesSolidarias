import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

import CustomInput from '@components/forms/CustomInput';
import CustomInputFiles from '@components/forms/CustomInputFiles';
import CustomSelect from '@components/forms/CustomSelect';
import CustomTextarea from '@components/forms/CustomTextarea';
import GridTwoColumns from '@components/common/GridTwoColumns';

import api from '@/config/api';
import fileApi from '@/config/fileApi';

import {
  Delivery,
  initialStatePlace,
  Place,
  ResponseData,
} from '@/constants/interfaces';

import { useUIStore } from '@/stores/uiStore';

import { API_ROUTES, WEB_ROUTES } from '@utils/routes';
import { handleChange } from '@utils/forms';

const PlaceForm = () => {
  const navigate = useNavigate();
  const setAlert = useUIStore((state) => state.setAlert);

  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [formData, setFormData] = useState<Place>(initialStatePlace);
  const [gallery, setGallery] = useState<File[] | null>(null);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [secondaryMedia, setSecondaryMedia] = useState<File | null>(null);

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

  const uploadPlaceMedia = async (placeId: string): Promise<boolean> => {
    if (!mainImage && !secondaryMedia && !gallery) {
      return true;
    }

    const mediaFiles = new FormData();

    if (mainImage) {
      mediaFiles.append('mainImage', mainImage);
    }
    if (secondaryMedia) {
      mediaFiles.append('secondaryMedia', secondaryMedia);
    }
    if (gallery) {
      gallery.forEach((file) => mediaFiles.append('gallery', file));
    }

    try {
      const response = await fileApi.post(
        API_ROUTES.placeMedia(placeId),
        mediaFiles,
      );

      if (response.status !== 201) {
        return false;
      }

      setMainImage(null);
      setSecondaryMedia(null);
      setGallery(null);

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
        API_ROUTES.place,
        formData,
      )) as ResponseData<Place>;

      if (response.statusCode !== 201 || !response?.data?._id) {
        console.error('Error submitting place:', response.message);
        setAlert('Error al enviar el lugar, intenta de nuevo');
        return;
      }

      const uploadMedia = await uploadPlaceMedia(response.data._id);
      if (!uploadMedia) {
        setAlert('Error al subir los archivos, intenta de nuevo');
        return;
      }

      setAlert('Lugar creada correctamente');
      setFormData(initialStatePlace);

      navigate(WEB_ROUTES.deliveries);
    } catch (error) {
      console.error('Error submitting delivery:', error);
    }
  };

  const handleFilesSelected = (files: File[]) => {
    setGallery((prev) => (prev ? [...prev, ...files] : [...files]));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <CustomSelect
        label="Entregas"
        options={deliveries.map((delivery) => ({
          label: String(delivery.year),
          value: delivery._id || '',
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
          value={formData.name}
        />
        <CustomInput
          label="Fecha de la entrega"
          name="deliveryDate"
          onChange={(e) => handleChange(e, setFormData)}
          type="date"
          value={formData.deliveryDate}
        />
      </GridTwoColumns>
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
      <GridTwoColumns>
        <CustomInputFiles
          label="Arrastra o selecciona la imagen principal"
          labelTitle="Imagen principal"
          accept={{ 'image/*': ['.jpg', '.png'] }}
          multiple={false}
          onFilesSelected={(files) => setMainImage(files[0])}
        />
        <CustomInputFiles
          label="Arrastra o selecciona la imagen o video secundario"
          labelTitle="Imagen o video secundario"
          accept={{ 'image/*': ['.jpg', '.png'], 'video/*': ['.mp4'] }}
          multiple={false}
          onFilesSelected={(files) => setSecondaryMedia(files[0])}
        />
      </GridTwoColumns>
      <CustomInputFiles
        label="Arrastra o selecciona las imagenes o videos de la galería"
        labelTitle="Galería"
        accept={{ 'image/*': ['.jpg', '.png'], 'video/*': ['.mp4'] }}
        multiple={true}
        onFilesSelected={handleFilesSelected}
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

export default PlaceForm;
