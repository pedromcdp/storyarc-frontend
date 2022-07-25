/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LogoutIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/auth';
import { useAddUser } from '../../hooks/useMutation';

export default function SidebarAuthRow({ user, Icon }) {
  const { logout, token, user: authUser } = useAuth();
  const { mutate: addUser } = useAddUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (authUser.photoURL) {
      addUser({
        id: authUser.uid,
        avatar: authUser.photoURL,
        name: authUser.displayName,
        email: authUser.email,
      });
    }
  }, [authUser]);

  return (
    <div
      role="button"
      tabIndex={0}
      className="group flex justify-center items-center p-[0.2rem] space-x-2 w-full hover:bg-gray-100 rounded-xl focus:outline-verde transition-all ease-in-out cursor-pointer md:justify-start md:p-2 md:duration-105"
    >
      <Link
        href={{
          pathname: '/auth/profile',
          query: { uid: authUser.uid, token },
        }}
        as="/auth/profile"
        passHref
      >
        <div className="group flex grow items-center space-x-2">
          {user && (
            <Image
              src={user.photoURL ? user.photoURL : '/images/avatar.webp'}
              alt={user.displayName ? user.displayName : user.email}
              width={35}
              height={35}
              layout="fixed"
              className="object-cover mask mask-squircle"
            />
          )}
          {!user && <Icon className="w-6 h-6" />}
          <div className="flex flex-col leading-none">
            <p className="">{user?.displayName}</p>
            <p className="hidden group-hover:inline-block group-focus:inline-block text-xs">
              Ver perfil
            </p>
          </div>
        </div>
      </Link>
      <button
        type="button"
        aria-label="Botão para encerrar sessão"
        onClick={() => {
          queryClient.removeQueries('userNotifications');
          queryClient.removeQueries('userNotificationCount');
          queryClient.removeQueries('userSavedPosts');
          queryClient.removeQueries('userLikedPosts');
          queryClient.removeQueries('userPosts');
          logout();
          router.push('/');
        }}
        className="flex-none justify-end opacity-0 group-hover:opacity-100 group-focus:opacity-100 hover:opacity-100 focus:opacity-100"
      >
        <LogoutIcon className="w-6 h-6 opacity-50 hover:opacity-100 focus:opacity-100 transition duration-75 ease-in-out" />
      </button>
    </div>
  );
}

SidebarAuthRow.propTypes = {
  user: PropTypes.object,
  Icon: PropTypes.elementType,
};
