import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from '@heroicons/react/solid';
import propTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Fragment } from 'react';
import PostImage from './PostImage';

export default function FullScreenView({
  showPortal,
  setShowPortal,
  image,
  newImage,
  description,
}) {
  return (
    <AnimatePresence>
      {showPortal && (
        <Fragment>
          {typeof window === 'object' &&
            createPortal(
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: 'easeIn' }}
                className="fixed inset-0 z-50 flex items-center justify-center"
              >
                <div
                  className="fixed inset-0 bg-black/60"
                  aria-hidden="true"
                  onClick={setShowPortal}
                />
                <motion.div
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="z-50 mx-0 flex aspect-video max-w-[95rem] flex-1 rounded-lg shadow-lg md:mx-12"
                >
                  <PostImage
                    image={image}
                    newImage={newImage}
                    description={description}
                    isFullScreen
                  />
                </motion.div>
                <button
                  className="absolute right-2 top-2 z-50"
                  onClick={setShowPortal}
                >
                  <XIcon className="h-8 w-8 text-white" />
                </button>
              </motion.div>,
              document.body,
            )}
        </Fragment>
      )}
    </AnimatePresence>
  );
}

FullScreenView.propTypes = {
  showPortal: propTypes.bool.isRequired,
  setShowPortal: propTypes.func.isRequired,
  image: propTypes.string.isRequired,
  newImage: propTypes.string,
  description: propTypes.string.isRequired,
};
