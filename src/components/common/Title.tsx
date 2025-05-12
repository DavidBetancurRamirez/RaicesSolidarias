import { Typography, TypographyProps } from '@material-tailwind/react';

interface TitleProps extends Omit<TypographyProps, 'children'> {
  containerClassName?: string;
  title: string;
}

const Title: React.FC<TitleProps> = ({
  containerClassName,
  title,
  ...props
}) => {
  return (
    <div
      className={`py-1 bg-accent dark:bg-dk_accent w-fit min-w-[50%] md:min-w-[30%] rounded-md ${containerClassName}`}
    >
      <Typography
        variant="h3"
        {...props}
        className={`text-background dark:text-dk_background ml-2 mr-10 ${props.className}`}
      >
        {title}
      </Typography>
    </div>
  );
};

export default Title;
