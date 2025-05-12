import '@material-tailwind/react';

declare module '@material-tailwind/react' {
  interface MTProps {
    crossOrigin?: string;
    onPointerEnterCapture?: never;
    onPointerLeaveCapture?: never;
    placeholder?: never;
  }

  interface BreadcrumbsProps extends MTProps {}
  interface ButtonProps extends MTProps {}
  interface CardBodyProps extends MTProps {}
  interface CardHeaderProps extends MTProps {}
  interface CardProps extends MTProps {}
  interface IconButtonProps extends MTProps {}
  interface InputProps extends MTProps {}
  interface NavbarProps extends MTProps {}
  interface TabPanelProps extends MTProps {}
  interface TabProps extends MTProps {}
  interface TabsBodyProps extends MTProps {}
  interface TabsHeaderProps extends MTProps {}
  interface TabsProps extends MTProps {}
  interface TextareaProps extends MTProps {}
  interface TypographyProps extends MTProps {}
}
