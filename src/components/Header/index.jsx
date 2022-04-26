import { useState } from 'react';
import { SearchIcon, UserCircleIcon } from '@heroicons/react/outline';
import { useClickOutside } from '@mantine/hooks';
import SidebarLogo from '../Sidebar/SidebarLogo';
import SidebarSearch from '../Sidebar/SidebarSearchBar';

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const searchBoxRef = useClickOutside(() => setShowSearch(false));
  const handleShowSearch = () => {
    setShowSearch(true);
  };

  return (
    <div className="flex sticky top-0 z-50 justify-between items-center py-1 px-4 bg-white shadow-sm md:hidden">
      {/* LEFT */}
      <div id="navbarRight" className="basis-1/4">
        <SidebarLogo />
      </div>
      {/* CENTER */}
      <div
        id="navbarCenter"
        className="hidden justify-center sm:inline-flex sm:basis-2/4"
      >
        <SidebarSearch />
      </div>
      {/* RIGHT */}
      <div id="navbarLeft" className="flex basis-3/4 justify-end sm:basis-1/4">
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
                aria-label="  caixa de pesquisa"
                type="text"
                //   onChange={handleTyping}
                placeholder="Pesquisar por locais"
                className="w-full h-full text-sm rounded-lg outline-none"
              />
            )}
          </button>
          <button className="hover:bg-gray-100 rounded-full navbarIcon">
            <UserCircleIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
