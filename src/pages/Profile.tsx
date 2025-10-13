import { Avatar, Button } from '@material-tailwind/react';

import { getAvatarSrc } from '@components/users/AvatarSelector';
import CustomLabel from '@components/forms/CustomLabel';
import PageLayout from '@components/layout/PageLayout';

import { useAuthStore } from '@/stores/authStore';

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <PageLayout title={{ title: 'Mi perfil' }}>
      <div className="p-6 bg-card dark:bg-dk_card rounded shadow">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex">
            <Avatar alt="avatar" size="xxl" src={getAvatarSrc(user?.avatar)} />
          </div>

          <div className="flex flex-col gap-4 w-full items-start">
            <div>
              <CustomLabel label="Correo electrónico" />
              <p className="text-text dark:text-dk_text">{user?.email}</p>
            </div>

            <div>
              <CustomLabel label="Nombre de usuario" />
              <p className="text-text dark:text-dk_text">{user?.userName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button color="blue" disabled>
          Editar perfil
        </Button>
        <Button color="red" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>
    </PageLayout>
  );
};

export default Profile;
