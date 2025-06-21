import { Typography, TypographyProps } from '@material-tailwind/react';
import { ChevronLeft } from 'lucide-react';

import ButtonWithIcon from './ButtonWithIcon';

interface ButtonTitleProps {
  goTo: () => void;
  text: string;
}

export interface TitleProps extends Omit<TypographyProps, 'children'> {
  button?: ButtonTitleProps;
  containerClassName?: string;
  title: string;
}

const Title: React.FC<TitleProps> = ({
  button,
  containerClassName,
  title,
  ...props
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row align-center gap-4 ${containerClassName}`}
    >
      {button && (
        <ButtonWithIcon
          className="w-fit"
          text={button.text}
          icon={<ChevronLeft />}
          onClick={button.goTo}
        />
      )}
      <div
        className={`py-1 bg-accent dark:bg-dk_accent w-fit min-w-[50%] md:min-w-[30%] rounded-md`}
      >
        <Typography
          variant="h3"
          {...props}
          className={`text-background dark:text-dk_background ml-2 mr-10 ${props.className}`}
        >
          {title}
        </Typography>
      </div>
    </div>
  );
};

export default Title;
