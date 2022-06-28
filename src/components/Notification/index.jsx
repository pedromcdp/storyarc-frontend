/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Portal } from 'react-portal';
import { XIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import NotificationIcon from './NotificationIcon';

export default function Notification({ show, closeFn, type, title, subtitle }) {
  const controls = useAnimation();

  useEffect(() => {
    if (!show) return;
    const timeout = setTimeout(() => {
      closeFn();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [show]);

  const handleDragEnd = async (event, info) => {
    if (info.offset.x >= 120) {
      closeFn();
    } else {
      controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } });
    }
  };

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
          className="group fixed top-16 right-1/2 z-30 w-3/4 transition-all ease-in-out translate-x-1/2 sm:right-3 sm:w-[22rem] sm:translate-x-0 md:top-3 sm:top-15"
        >
          <motion.div
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0 }}
            dragElastic={{ left: 0.1 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            className="flex justify-between items-center p-3 min-h-[4.5rem] bg-white rounded-2xl border shadow-lg"
          >
            <button
              className="fixed top-2 right-2 w-5 h-5 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-100 ease-in-out sm:opacity-0"
              onClick={closeFn}
            >
              <XIcon />
            </button>
            <div className="flex justify-between items-center mr-4">
              <div className="flex gap-2 items-center">
                <NotificationIcon type={type} />
                <div className="flex flex-col">
                  <span>{title}</span>
                  {subtitle && (
                    <span className="text-xs text-gray-500">{subtitle}</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </Transition.Child>
      </Transition>
    </Portal>
  );
}

Notification.propTypes = {
  show: PropTypes.bool.isRequired,
  closeFn: PropTypes.func.isRequired,
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
