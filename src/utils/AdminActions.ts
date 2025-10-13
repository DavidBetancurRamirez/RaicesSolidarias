import { Edit, Trash2 } from 'lucide-react';

import { Action } from '@components/layout/PageLayout';

interface AdminActionsProps {
  deleteOnClick?: () => void;
  editOnClick?: () => void;
  isAdmin?: boolean;
}

const AdminActions = ({
  deleteOnClick,
  editOnClick,
  isAdmin = false,
}: AdminActionsProps) => {
  if (!isAdmin) return undefined;

  const actions: Action[] = [
    ...(editOnClick
      ? [
          {
            className: 'bg-blue-800 hover:bg-blue-600',
            icon: Edit,
            onClick: editOnClick,
          },
        ]
      : []),
    ...(deleteOnClick
      ? [
          {
            className: 'bg-red-800 hover:bg-red-600',
            icon: Trash2,
            onClick: deleteOnClick,
          },
        ]
      : []),
  ];

  return actions;
};

export default AdminActions;
