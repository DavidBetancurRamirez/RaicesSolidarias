import '@material-tailwind/react';

declare module '@material-tailwind/react' {
  interface MTProps {
    crossOrigin?: string;
    onPointerEnterCapture?: never;
    onPointerLeaveCapture?: never;
    placeholder?: never;
  }

  interface ButtonProps extends MTProps {}
  interface CardProps extends MTProps {}
  interface CardHeaderProps extends MTProps {}
  interface CardBodyProps extends MTProps {}
  interface IconButtonProps extends MTProps {}
  interface InputProps extends MTProps {}
  interface NavbarProps extends MTProps {}
  interface TypographyProps extends MTProps {}
}
