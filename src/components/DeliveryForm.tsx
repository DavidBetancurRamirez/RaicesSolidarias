import { useState } from 'react';
import { Button } from '@material-tailwind/react';

import CustomInput from './CustomInput';

import { Delivery, initialStateDelivery } from '@/constants/interfaces';

const DeliveryForm = () => {
  const [formData, setFormData] = useState<Delivery>(initialStateDelivery);

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
        label="Año"
        name="year"
        onChange={handleChange}
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
        onChange={handleChange}
      />
      <Button
        className="bg-primary dark:bg-dk_primary text-white mt-4"
        fullWidth
      >
        Guardar
      </Button>
    </form>
  );
};

export default DeliveryForm;
