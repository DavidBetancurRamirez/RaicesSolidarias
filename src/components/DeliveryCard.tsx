import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { ArrowRight } from 'lucide-react';

import ButtonWithIcon from './ButtonWithIcon';

interface DeliveryCardProps {
  buttonText?: string;
  description: string;
  fallbackImage: string;
  imageSources: { srcSet: string; media: string }[];
  onClick: () => void;
  reverse?: boolean;
  year: string;
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({
  buttonText = 'Ver más',
  description,
  fallbackImage,
  imageSources,
  onClick,
  reverse = false,
  year,
}) => {
  return (
    <Card
      className={`w-full flex-row rounded-xl bg-card dark:bg-dk_card h-48 md:h-56 lg:h-64 ${
        reverse ? 'flex-row-reverse' : ''
      }`}
    >
      <CardHeader
        shadow={false}
        floated={false}
        className={`m-0 w-2/5 shrink-0 rounded-xl bg-card dark:bg-dk_card h-full ${
          reverse ? 'rounded-l-none' : 'rounded-r-none'
        }`}
      >
        <picture>
          {imageSources.map((source, index) => (
            <source key={index} srcSet={source.srcSet} media={source.media} />
          ))}
          <img
            src={fallbackImage}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </picture>
      </CardHeader>
      <CardBody className="p-4 text-text dark:text-dk_text h-full flex flex-col justify-between w-full">
        <div>
          <Typography variant="h4" className="mb-4">
            {year}
          </Typography>
          <Typography className="mb-6 font-normal">{description}</Typography>
        </div>
        <ButtonWithIcon
          className="w-fit"
          text={buttonText}
          icon={<ArrowRight />}
          onClick={onClick}
        />
      </CardBody>
    </Card>
  );
};

export default DeliveryCard;
