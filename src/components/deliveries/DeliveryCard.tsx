import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';

import ButtonWithIcon from '../common/ButtonWithIcon';
import SafeImage from '../common/SafeImage';

interface DeliveryCardProps {
  buttonText?: string;
  description: string;
  image?: string;
  onClick: () => void;
  reverse?: boolean;
  year: number;
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({
  buttonText = 'Ver más',
  description,
  image,
  onClick,
  reverse = false,
  year,
}) => {
  return (
    <Card
      className={`w-full flex flex-col md:flex-row rounded-xl bg-card dark:bg-dk_card h-auto md:max-h-72 ${
        reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      <CardHeader
        shadow={false}
        floated={false}
        className={`m-0 w-full md:w-2/5 shrink-0 rounded-t-xl rounded-b-none md:rounded-none ${
          reverse ? 'md:rounded-r-xl' : 'md:rounded-l-xl'
        } bg-card dark:bg-dk_card h-48 md:h-full`}
      >
        <SafeImage alt={`Año ${year}`} className="rounded-none" src={image} />
      </CardHeader>

      <CardBody className="p-4 flex flex-col justify-between gap-4 h-72 w-full text-text dark:text-dk_text">
        <div className="flex flex-col overflow-y-auto">
          <Typography variant="h4">{year}</Typography>
          <Typography className="mt-1 text-justify overflow-y-auto pr-1">
            {description}
          </Typography>
        </div>
        <ButtonWithIcon className="w-fit" text={buttonText} onClick={onClick} />
      </CardBody>
    </Card>
  );
};

export default DeliveryCard;
