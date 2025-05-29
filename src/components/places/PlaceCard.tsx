import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';

import ButtonWithIcon from '../common/ButtonWithIcon';
import SafeImage from '../common/SafeImage';

interface PlaceCardProps {
  date: Date;
  description: string;
  id?: string;
  image: string;
  onClick: () => void;
  place: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  date,
  description,
  image,
  onClick,
  place,
}) => {
  const text = `${place} - ${date?.toLocaleDateString()}`;

  return (
    <Card className="flex-shrink-0 snap-center basis-full md:min-w-[300px] md:max-w-[300px] rounded-xl bg-card dark:bg-dk_card">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-full shrink-0 rounded-t-xl rounded-b-none bg-card dark:bg-dk_card h-60"
      >
        <SafeImage alt={text} className="rounded-none" src={image} />
      </CardHeader>

      <CardBody className="p-4 w-full text-text dark:text-dk_text h-72">
        <ButtonWithIcon className="w-full" text={text} onClick={onClick} />
        <div className="mt-4 overflow-y-auto max-h-[calc(100%-4rem)] pr-2">
          <Typography
            variant="small"
            className="text-justify whitespace-pre-line"
          >
            {description}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default PlaceCard;
