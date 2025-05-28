import React from 'react';
import { Avatar, Card, Typography } from '@material-tailwind/react';
import { Edit, Trash } from 'lucide-react';

import { Testimonial } from '@/constants/interfaces';
import { avatarMap } from '@components/users/AvatarSelector';

interface TestimonialProps extends Omit<Testimonial, '_id'> {
  actions: boolean;
  avatar?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const Testimony: React.FC<TestimonialProps> = ({
  actions,
  avatar,
  createdBy,
  testimonial,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex gap-2 w-full items-center">
      <Avatar
        alt="avatar"
        size="xxl"
        src={
          avatar && avatarMap[avatar] ? avatarMap[avatar] : avatarMap['avatar1']
        }
      />
      <Card className="pr-1 rounded-xl bg-card dark:bg-dk_card w-full gap-2 text-text dark:text-dk_text p-2 h-36 md:h-44">
        <div className="flex justify-between items-center">
          <Typography variant="h5">{createdBy.userName || ''}</Typography>
          {actions && (
            <div className="flex gap-2 items-center">
              <Edit
                className="cursor-pointer transition-all hover:text-blue-500"
                size={20}
                onClick={onEdit}
              />
              <Trash
                className="cursor-pointer transition-all hover:text-red-500"
                size={20}
                onClick={onDelete}
              />
            </div>
          )}
        </div>
        <Typography className="text-justify overflow-y-auto">
          {testimonial}
        </Typography>
      </Card>
    </div>
  );
};

export default Testimony;
