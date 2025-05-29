import { Alert as MtAlert } from '@material-tailwind/react';
import { useEffect } from 'react';

import { useUIStore } from '@/stores/uiStore';

const Alert = () => {
  const { open, message, closeAlert } = useUIStore();

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        closeAlert();
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [open, closeAlert]);

  if (!open) return null;

  return (
    <MtAlert
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
      className="rounded-none border-l-4 border-primary dark:border-dk_primary bg-primary/90 dark:bg-dk_primary/70 text-white fixed ml-[15px] bottom-[50px] left-0 w-96 z-50"
      onClose={closeAlert}
      open={open}
    >
      {message}
    </MtAlert>
  );
};

export default Alert;
