import { Edit, Trash2 } from 'lucide-react';

import { Action } from '@components/layout/PageLayout';

import { UserRoles } from '@/constants/roles';

import { useAuthStore } from '@/stores/authStore';

interface AdminActionsProps {
  deleteOnClick?: () => void;
  editOnClick?: () => void;
}

const AdminActions = ({ deleteOnClick, editOnClick }: AdminActionsProps) => {
  const user = useAuthStore((state) => state.user);

  if (!user || !user.roles.includes(UserRoles.ADMIN)) {
    return;
  }

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
