/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Portal } from 'react-portal';
import { XIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

export default function Notification({ show, closeFn, title, subtitle }) {
  useEffect(() => {
    if (!show) return;
    const timeout = setTimeout(() => {
      closeFn();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <Portal>
      <Transition show={show} appear={true}>
        <Transition.Child
          enter="ease-in-out duration-200"
          enterFrom="-translate-y-full sm:-translate-y-0 sm:translate-x-full opacity-0"
          enterTo="sm:translate-x-0 opacity-100"
          leave="ease-out duration-300"
          leaveFrom="translate-y-0 sm:translate-x-0 opacity-100"
          leaveTo="-translate-y-full sm:-translate-y-0 sm:translate-x-full opacity-0"
          className="fixed top-16 right-1/2 z-30 w-3/4 transition-all ease-in-out translate-x-1/2 sm:right-3 sm:w-[22rem] sm:translate-x-0 md:top-3 sm:top-15"
        >
          <div className="flex justify-between items-center p-3 h-[4.5rem] bg-white rounded-2xl border shadow-lg">
            <button className="fixed top-2 right-2 w-5 h-5" onClick={closeFn}>
              <XIcon />
            </button>
            <div className="flex justify-between items-center mr-4">
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 bg-red-100" />
                <div className="flex flex-col">
                  <span>{title}</span>
                  <span className="text-xs text-gray-500">{subtitle}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Transition>
    </Portal>
  );
}

Notification.propTypes = {
  show: PropTypes.bool.isRequired,
  closeFn: PropTypes.func.isRequired,
};
