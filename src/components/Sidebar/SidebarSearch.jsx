import { useRef, useState, useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import SearchLoadingAnim from '../Search/SearchLoadingAnim';
import SearchResultsContainer from '../Search/SearchResultsContainer';

export default function SidebarSearch() {
  const searchRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsExpanded(false);
      searchRef.current.blur();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isExpanded]);

  return (
    <div
      className="group z-10 grow max-w-[18rem] cursor-text md:max-w-full md:max-h-full"
      rolo="search"
    >
      <div
        className={`flex items-center h-12 px-2 space-x-1 w-full shadow-sm border group-focus-within:border-verde transition-all duration-[50ms] ease-in ${
          isExpanded ? 'rounded-t-xl' : 'rounded-xl'
        }`}
      >
        <SearchIcon className="w-6 h-6 text-verde" />
        <input
          ref={searchRef}
          type="text"
          //   onChange={handleTyping}
          placeholder="Pesquisar por locais"
          className="w-full h-full text-sm rounded-lg outline-none"
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setIsExpanded(false)}
        />
      </div>
      {isExpanded && (
        <SearchResultsContainer>
          <SearchLoadingAnim />
        </SearchResultsContainer>
      )}
    </div>
  );
}
