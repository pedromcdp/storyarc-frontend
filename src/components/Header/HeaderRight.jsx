import { useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import { SearchIcon, UserCircleIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

export default function HeaderRight() {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const searchBoxRef = useClickOutside(() => setShowSearch(false));

  const handleShowSearch = () => {
    setShowSearch(true);
  };

  const handleUsrBtnClick = () => {
    router.push('/login');
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
          aria-label="Iniciar sessão"
          onClick={handleUsrBtnClick}
          className="hover:bg-gray-100 rounded-full navbarIcon"
        >
          <UserCircleIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
