import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';

import { useModalStore } from '@/stores/useModalStore';

const Modal = () => {
  const { body, closeModal, header, onAccept, open } = useModalStore();

  if (!open) return null;

  const handleAccept = () => {
    if (onAccept) {
      onAccept();
    }
    closeModal();
  };

  return (
    <Dialog open={open} handler={closeModal}>
      <DialogHeader>{header}</DialogHeader>
      <DialogBody>{body}</DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={closeModal}
          className="mr-1"
        >
          <span>Cancelar</span>
        </Button>
        <Button
          className="bg-primary dark:bg-dk_primary text-white"
          onClick={handleAccept}
        >
          Confirmar
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default Modal;
