export const validatePassword = (password: string) => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*\.])(?=.{6,})/;
  return regex.test(password);
};
