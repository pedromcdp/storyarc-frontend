/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import { motion, useAnimation } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import NotificationIcon from './NotificationIcon';
import {
  useNotification,
  hideNotification,
} from '../../features/notification/notificationSlice';

export default function Notification() {
  const notificationDetails = useSelector(useNotification);
  const dispatch = useDispatch();
  const controls = useAnimation();

  useEffect(() => {
    if (!notificationDetails.show) return;
    const timeout = setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);
    return () => clearTimeout(timeout);
  }, [notificationDetails.show]);

  const handleDragEnd = async (event, info) => {
    if (info.offset.x >= 120) {
      dispatch(hideNotification());
    } else {
      controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } });
    }
  };

  return (
    <Fragment>
      {typeof window === 'object' &&
        createPortal(
          <Transition show={notificationDetails.show} appear={true}>
            <Transition.Child
              enter="ease-in-out duration-200"
              enterFrom="-translate-y-full sm:-translate-y-0 sm:translate-x-full opacity-0"
              enterTo="sm:translate-x-0 opacity-100"
              leave="ease-out duration-300"
              leaveFrom="translate-y-0 sm:translate-x-0 opacity-100"
              leaveTo="-translate-y-full sm:-translate-y-0 sm:translate-x-full opacity-0"
              className="sm:top-15 group fixed right-1/2 top-16 z-50 w-3/4 translate-x-1/2 transition-all ease-in-out sm:right-3 sm:w-[22rem] sm:translate-x-0 md:top-3"
            >
              <motion.div
                drag="x"
                dragDirectionLock
                dragConstraints={{ left: 0 }}
                dragElastic={{ left: 0.1 }}
                onDragEnd={handleDragEnd}
                animate={controls}
                className="flex min-h-[4.5rem] items-center justify-between rounded-2xl border bg-white p-3 shadow-lg"
              >
                <button
                  className="fixed right-2 top-2 h-5 w-5 transition-opacity duration-100 ease-in-out group-hover:opacity-100 group-focus:opacity-100 sm:opacity-0"
                  onClick={() => dispatch(hideNotification())}
                >
                  <XIcon />
                </button>
                <div className="mr-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <NotificationIcon type={notificationDetails.type} />
                    <div className="flex flex-col">
                      <span>{notificationDetails.title}</span>
                      {notificationDetails.subtitle && (
                        <span className="text-xs text-gray-500">
                          {notificationDetails.subtitle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Transition.Child>
          </Transition>,
          document.body,
        )}
    </Fragment>
  );
}
