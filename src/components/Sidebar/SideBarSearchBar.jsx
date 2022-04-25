import { useRef } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

export default function SideBarSearchBar() {
  const searchRef = useRef(null);

  const setFocus = () => {
    searchRef.current.focus();
  };

  return (
    <div
      tabIndex={0}
      className="flex items-center px-2 space-x-1 w-full h-12 rounded-xl border shadow-sm cursor-text"
      rolo="search"
      onFocus={setFocus}
    >
      <SearchIcon className="w-6 h-6 text-verde" />
      <input
        ref={searchRef}
        type="text"
        //   onChange={handleTyping}
        placeholder="Pesquisar por locais"
        className="w-full h-full text-sm rounded-lg outline-none"
      />
    </div>
  );
}
