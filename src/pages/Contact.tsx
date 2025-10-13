import { useState } from 'react';
import { Button, Checkbox, Typography } from '@material-tailwind/react';
import PageLayout from '@components/layout/PageLayout';
import Title from '@components/common/Title';
import CustomInput from '@components/forms/CustomInput';
import CustomTextarea from '@components/forms/CustomTextarea';
import GridTwoColumns from '@components/common/GridTwoColumns';

interface ContactFormData {
  acceptPrivacy: boolean;
  email: string;
  firstName: string;
  message: string;
  phone: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    acceptPrivacy: false,
    email: '',
    firstName: '',
    message: '',
    phone: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, acceptPrivacy: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const bankInfo = [
    { label: 'Banco', value: 'Bancolombia' },
    { label: 'Tipo de cuenta', value: 'Ahorros' },
    { label: 'Número de cuenta', value: '123-456-78900' },
    { label: 'Titular', value: 'Fundación Raíces Solidarias' },
    { label: 'NIT', value: '900.123.456-7' },
  ];

  const whatsappContacts = [
    { name: 'María González', number: '+57 300 123 4567' },
    { name: 'Juan Pérez', number: '+57 310 987 6543' },
    { name: 'Ana Rodríguez', number: '+57 320 456 7890' },
  ];

  return (
    <PageLayout title={{ title: 'Contacto' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Información cuenta bancaria */}
        <div className="border border-text dark:border-dk_text rounded-lg p-6">
          <Typography
            variant="h6"
            className="text-text dark:text-dk_text mb-4 font-semibold"
          >
            Información cuenta bancaria
          </Typography>
          <div className="space-y-2">
            {bankInfo.map((item, index) => (
              <div key={index}>
                <Typography
                  variant="small"
                  className="text-text dark:text-dk_text font-semibold"
                >
                  {item.label}:
                </Typography>
                <Typography
                  variant="small"
                  className="text-text dark:text-dk_text"
                >
                  {item.value}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Información QR donaciones */}
        <div className="border border-text dark:border-dk_text rounded-lg p-6">
          <Typography
            variant="h6"
            className="text-text dark:text-dk_text mb-4 font-semibold"
          >
            Información QR donaciones
          </Typography>
          <Typography
            variant="small"
            className="text-text dark:text-dk_text mb-4"
          >
            Escanea el código QR para realizar tu donación de manera rápida y
            segura.
          </Typography>
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center">
              <Typography
                variant="small"
                className="text-gray-600 dark:text-gray-400"
              >
                QR Code
              </Typography>
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="border border-text dark:border-dk_text rounded-lg p-6">
          <Typography
            variant="h6"
            className="text-text dark:text-dk_text mb-4 font-semibold"
          >
            Whatsapp
          </Typography>
          <div className="space-y-3">
            {whatsappContacts.map((contact, index) => (
              <div key={index}>
                <Typography
                  variant="small"
                  className="text-text dark:text-dk_text font-semibold"
                >
                  {contact.name}
                </Typography>
                <Typography
                  variant="small"
                  className="text-text dark:text-dk_text"
                >
                  {contact.number}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Correo electrónico */}
        <div className="border border-text dark:border-dk_text rounded-lg p-6">
          <Typography
            variant="h6"
            className="text-text dark:text-dk_text mb-4 font-semibold"
          >
            Correo electrónico
          </Typography>
          <Typography variant="small" className="text-text dark:text-dk_text">
            contacto@raicessolidarias.org
          </Typography>
        </div>
      </div>

      <div>
        <Title title="Formulario" />

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <GridTwoColumns>
            <CustomInput
              label="Celular"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <CustomInput
              label="E-mail"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </GridTwoColumns>

          <CustomInput
            label="Nombre"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />

          <CustomTextarea
            label="Mensaje"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />

          <div className="flex items-center gap-2">
            <Checkbox
              checked={formData.acceptPrivacy}
              onChange={handleCheckboxChange}
              className="border-text dark:border-dk_text"
              required
              label={
                <Typography
                  variant="small"
                  className="text-text dark:text-dk_text"
                >
                  Acepto políticas de privacidad y tratamiento de datos
                  personales
                </Typography>
              }
            />
          </div>

          {/* Botón Enviar */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-accent dark:bg-dk_accent text-background dark:text-dk_background px-8"
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default Contact;
