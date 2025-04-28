import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';

import ButtonWithIcon from './ButtonWithIcon';

interface PlaceCardProps {
  date: Date;
  description: string;
  image: string;
  place: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  date,
  description,
  image,
  place,
}) => {
  return (
    <Card className="rounded-xl min-w-96 bg-card dark:bg-dk_card">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-full shrink-0 rounded-t-xl rounded-b-none bg-card dark:bg-dk_card h-60"
      >
        <img className="w-full object-cover h-full" src={image} />
      </CardHeader>

      <CardBody className="p-4 w-full text-text dark:text-dk_text h-72">
        <ButtonWithIcon
          className="w-full"
          text={`${place} ${date.toLocaleString()}`}
        />
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
