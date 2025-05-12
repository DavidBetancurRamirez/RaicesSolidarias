import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';

import CustomInput from '../common/CustomInput';

import { initialStatePlace, Place } from '@/constants/interfaces';

const PlaceForm = () => {
  const [formData, setFormData] = useState<Place>(initialStatePlace);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <CustomInput
        label="ID de la entrega"
        name="deliveryId"
        onChange={handleChange}
        placeholder="ID de la entrega"
        value={formData.deliveryId}
      />
      <CustomInput
        label="Nombre del lugar"
        name="name"
        onChange={handleChange}
        placeholder="Nombre del lugar"
        value={formData.name}
      />
      <CustomInput
        label="Fecha de la entrega"
        name="deliveryDate"
        onChange={handleChange}
        type="date"
        value={formData.deliveryDate}
      />
      <CustomInput
        isTextarea
        label="Descripción"
        name="description"
        placeholder="Descripción de la entrega"
        value={formData.description}
        onChange={handleChange}
      />
      <Button
        className="bg-primary dark:bg-dk_primary text-white mt-2"
        fullWidth
      >
        Guardar
      </Button>
    </form>
  );
};

export default PlaceForm;
