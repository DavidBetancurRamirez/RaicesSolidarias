import React from 'react';
import { Avatar, Card, Typography } from '@material-tailwind/react';

import { Testimonial } from '@/constants/interfaces';

const Testimony: React.FC<Testimonial> = ({ createdBy, testimonial }) => {
  return (
    <div className="flex gap-2 w-full items-center">
      <Avatar
        src="https://docs.material-tailwind.com/img/face-2.jpg"
        alt="avatar"
        size="xxl"
      />
      <Card className="rounded-xl bg-card dark:bg-dk_card w-full gap-2 text-text dark:text-dk_text p-2 h-40">
        <Typography variant="h5">{createdBy.userName || ''}</Typography>
        <Typography className="text-justify overflow-y-auto">
          {testimonial}
        </Typography>
      </Card>
    </div>
  );
};

export default Testimony;
