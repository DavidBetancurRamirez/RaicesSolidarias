import { Typography } from '@material-tailwind/react';

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="py-1 bg-accent dark:bg-dk_accent w-fit min-w-[50%] md:min-w-[30%] rounded-md mb-4">
      <Typography
        variant="h3"
        className=" text-background dark:text-dk_background ml-2 mr-20"
      >
        {title}
      </Typography>
    </div>
  );
};

export default Title;
