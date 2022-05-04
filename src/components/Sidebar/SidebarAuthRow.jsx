import Image from 'next/image';
import { LogoutIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import { auth } from '../../firebase/firebase';

export default function SidebarAuthRow({ user, Icon }) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="group flex justify-center items-center p-[0.2rem] space-x-2 w-full hover:bg-gray-100 rounded-xl transition ease-in-out cursor-pointer md:justify-start md:p-2 md:duration-105"
    >
      {user && (
        <Image
          src={user?.avatar}
          alt={user?.name}
          width={35}
          height={35}
          layout="fixed"
          className="object-cover mask mask-squircle"
        />
      )}
      {!user && <Icon className="w-6 h-6" />}
      <div className="flex flex-col leading-none">
        <p className="">{user?.name}</p>
        <a href="/perfil" className="hidden group-hover:inline-block text-xs">
          Ver perfil
        </a>
      </div>
      <button
        type="button"
        aria-label="Botão para sair da conta"
        onClick={() => auth.signOut()}
        className="flex grow justify-end opacity-0 group-hover:opacity-100 hover:opacity-100"
      >
        <LogoutIcon className="w-6 h-6 opacity-50 hover:opacity-100 transition duration-75 ease-in-out" />
      </button>
    </div>
  );
}

SidebarAuthRow.propTypes = {
  user: PropTypes.object,
  Icon: PropTypes.elementType,
};
