import { ButtonProps, Button as MtButton } from '@material-tailwind/react';

export const RsButton = ({ children, ...props }: ButtonProps) => (
  <MtButton {...props}>{children}</MtButton>
);
