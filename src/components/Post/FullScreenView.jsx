import { AnimatePresence, motion } from 'framer-motion';
import { Portal } from 'react-portal';
import { XIcon } from '@heroicons/react/solid';
import propTypes from 'prop-types';
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
        <Portal>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: 'easeIn' }}
            className="flex fixed inset-0 z-50 justify-center items-center"
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
              className="aspect-video flex z-50 flex-1 mx-0 max-w-[95rem] rounded-lg shadow-lg md:mx-12"
            >
              <PostImage
                image={image}
                newImage={newImage}
                description={description}
                isFullScreen
              />
            </motion.div>
            <button
              className="absolute top-2 right-2 z-50"
              onClick={setShowPortal}
            >
              <XIcon className="w-8 h-8 text-white" />
            </button>
          </motion.div>
        </Portal>
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
