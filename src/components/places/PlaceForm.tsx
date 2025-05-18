import React, { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';

import CustomInput from '@components/forms/CustomInput';
import CustomSelect from '@components/forms/CustomSelect';
import CustomTextarea from '@components/forms/CustomTextarea';
import GridTwoColumns from '@components/common/GridTwoColumns';

import api from '@/config/api';

import {
  Delivery,
  initialStatePlace,
  Place,
  ResponseData,
} from '@/constants/interfaces';

import { useUIStore } from '@/stores/uiStore';

import { API_ROUTES } from '@utils/routes';
import { handleChange } from '@utils/forms';

const PlaceForm = () => {
  const setAlert = useUIStore((state) => state.setAlert);

  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [formData, setFormData] = useState<Place>(initialStatePlace);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = (await api.post(
        API_ROUTES.place,
        formData,
      )) as ResponseData<Place>;

      if (response.statusCode !== 201) {
        console.error('Error submitting place:', response.message);
        setAlert('Error al enviar el lugar, intenta de nuevo');
        return;
      }

      setAlert('Lugar creada correctamente');
      setFormData(initialStatePlace);
    } catch (error) {
      console.error('Error submitting delivery:', error);
    }
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
