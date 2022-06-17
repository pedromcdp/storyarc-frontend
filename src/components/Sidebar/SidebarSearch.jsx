import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SearchIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import SearchLoadingAnim from '../Search/SearchLoadingAnim';
import SearchResultsContainer from '../Search/SearchResultsContainer';

export default function SidebarSearch({ focus }) {
  const searchRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsExpanded(false);
      searchRef.current.blur();
    }
  };

  useEffect(() => {
    if (focus) {
      searchRef.current.focus();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isExpanded, focus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchRef.current.value.length > 0) {
      searchRef.current.blur();
      router.push(`/search/${searchRef.current.value}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="group z-10 grow cursor-text sm:max-w-[18rem] md:max-w-full md:max-h-full"
      role="search"
    >
      <div
        className={`flex items-center h-12 px-2 space-x-1 w-full bg-white shadow-sm border group-focus-within:border-verde transition-all duration-[50ms] ease-in ${
          isExpanded ? 'rounded-t-xl' : 'rounded-xl'
        }`}
      >
        <SearchIcon className="w-6 h-6 text-verde" />
        <input
          ref={searchRef}
          type="text"
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
    </form>
  );
}

SidebarSearch.propTypes = {
  focus: PropTypes.bool,
};
