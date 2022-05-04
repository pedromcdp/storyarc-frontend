import { useRef } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

export default function SidebarSearch() {
  const searchRef = useRef(null);

  return (
    <div
      className="grow max-w-[18rem] h-12 max-h-11 rounded-t-xl border shadow-sm cursor-text md:max-w-full md:max-h-full"
      rolo="search"
    >
      <div className="flex items-center px-2 space-x-1 w-full h-full">
        <SearchIcon className="w-6 h-6 text-verde" />
        <input
          ref={searchRef}
          type="text"
          //   onChange={handleTyping}
          placeholder="Pesquisar por locais"
          className="w-full h-full text-sm rounded-lg outline-none"
        />
      </div>
      {/* <div className="relative items-center w-full h-full">
        <ul className="overflow-auto absolute w-full max-h-80 bg-white rounded-b-xl border shadow-sm">
          <li className="py-2 px-3 hover:bg-gray-100 cursor-pointer">fdsfs</li>
        </ul>
      </div> */}
    </div>
  );
}
