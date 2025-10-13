import React from 'react';
import { Button, IconButton } from '@material-tailwind/react';
import { Trash2 } from 'lucide-react';

import { useModalStore } from '@/stores/useModalStore';

interface CustomBottomButtonsProps {
  deleteAction?: () => void;
  edit?: boolean;
}

const CustomBottomButtons: React.FC<CustomBottomButtonsProps> = ({
  deleteAction,
  edit,
}) => {
  const setModal = useModalStore((state) => state.setModal);

  const handleDelete = () => {
    setModal({
      body: '¿Estás seguro de que deseas eliminar este elemento?',
      header: 'Confirmar eliminación',
      onAccept: deleteAction,
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        className="bg-primary dark:bg-dk_primary text-white"
        fullWidth
        type="submit"
      >
        {edit ? 'Editar' : 'Guardar'}
      </Button>

      {edit && (
        <IconButton color="red" type="button" onClick={handleDelete}>
          <Trash2 size={18} />
        </IconButton>
      )}
    </div>
  );
};

export default CustomBottomButtons;
