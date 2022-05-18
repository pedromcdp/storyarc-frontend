/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import {
  SearchIcon,
  UserCircleIcon,
  PlusIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { auth } from '../../firebase/firebase';
import { openDialog } from '../../features/dialog/dialogSlice';
import { useUser } from '../../features/auth/authSlice';

export default function HeaderRight() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(useUser);
  const [showSearch, setShowSearch] = useState(false);
  const searchBoxRef = useClickOutside(() => setShowSearch(false));

  const handleShowSearch = () => {
    setShowSearch(true);
  };

  const handleUsrBtnClick = () => {
    if (!auth.currentUser) {
      router.push('/auth/signin');
    }
  };

  const handleAddBtnClick = () => {
    if (!auth.currentUser) {
      dispatch(openDialog());
    } else {
      console.log('User logged in');
    }
  };

  return (
    <div id="navbarRight" className="flex basis-3/4 justify-end sm:basis-1/4">
      <div className="flex justify-between items-center space-x-1">
        <button
          aria-label="abrir caixa de pesquisa"
          ref={searchBoxRef}
          onClick={handleShowSearch}
          className={`sm:hidden navbarIcon ${
            showSearch
              ? 'shadow border rounded-2xl'
              : 'hover:bg-gray-100 rounded-full'
          }`}
        >
          <SearchIcon className="w-6 h-6" />
          {showSearch && (
            <input
              aria-label="caixa de pesquisa"
              type="text"
              //   onChange={handleTyping}
              placeholder="Pesquisar por locais"
              className="w-full h-full text-sm rounded-lg outline-none"
            />
          )}
        </button>
        <button
          aria-label="Adicionar conteúdo"
          onClick={handleAddBtnClick}
          className="hover:bg-gray-100 rounded-full navbarIcon"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
        {user ? (
          <div
            tabIndex={0}
            className="justify-center items-center p-[0.45rem] w-10 h-10 hover:bg-gray-100 rounded-full cursor-pointer dropdown dropdown-end"
          >
            <Image
              src={auth.currentUser.photoURL}
              alt={auth.currentUser.displayName}
              width={28}
              height={28}
              layout="fixed"
              className="object-cover rounded-full"
            />
            <ul className="p-2 w-52 bg-white drop-shadow-lg dropdown-content menu rounded-box">
              <li tabIndex={0}>
                <a className="text-sm" href="/profile">
                  <UserCircleIcon className="w-6 h-6" />
                  Ver perfil
                </a>
              </li>
              <div className="w-full h-[1.2px] bg-gray-100 rounded-2xl"></div>
              <li tabIndex={0}>
                <button className="text-sm" onClick={() => auth.signOut()}>
                  <LogoutIcon className="w-6 h-6 text-red-500" />
                  Encerrar Sessão
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <button
            aria-label="Iniciar sessão"
            onClick={handleUsrBtnClick}
            className="hover:bg-gray-100 rounded-full navbarIcon"
          >
            <UserCircleIcon className="w-6 h-6 text-verde" />
          </button>
        )}
      </div>
    </div>
  );
}
