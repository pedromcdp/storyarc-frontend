import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

export default function SearchResultsContainer({ children }) {
  return (
    <Transition
      appear={true}
      show={true}
      enter="transition ease duration-200 transform"
      enterFrom="opacity-0 -translate-y-full"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease duration-100 transform"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-full"
      className="relative items-center w-full h-full"
    >
      <ul className="overflow-auto absolute w-full max-h-80 bg-white rounded-b-xl border-x border-b shadow-sm">
        {children}
      </ul>
    </Transition>
  );
}

SearchResultsContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
