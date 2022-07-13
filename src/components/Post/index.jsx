import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Portal } from 'react-portal';
import PostHeader from './PostHeader';
import PostDescription from './PostDescription';
import PostImage from './PostImage';
import PostFooter from './PostFooter';
import CommentInput from './CommentInput';
import CommentsContainer from './CommentsContainer';
import useAuth from '../../hooks/auth';

export default function Post({
  id,
  uid,
  username,
  avatar,
  timestamp,
  description,
  image,
  newImage,
}) {
  const { user } = useAuth();
  const [showPortal, setShowPortal] = useState(false);

  return (
    <motion.article initial={false} layout className="flex flex-col">
      <motion.div className="px-5 pt-5 mt-5 bg-white rounded-2xl border shadow-sm">
        <PostHeader
          name={username}
          avatar={avatar}
          timestamp={timestamp}
          id={id}
          image={image}
          newImage={newImage}
        />
        <PostDescription description={description} />
        <PostImage
          image={image}
          newImage={newImage}
          description={description}
          openPortal={() => setShowPortal(true)}
        />
        <div className="mt-2" />
        {user && (
          <>
            <PostFooter id={id} uid={uid} />
            <CommentInput user={user} id={id} />
          </>
        )}
        <CommentsContainer id={id} />
      </motion.div>
      {showPortal && (
        <Portal>
          <div className="flex fixed inset-0 z-50 justify-center items-center">
            <div
              className="fixed inset-0 bg-black/30"
              aria-hidden="true"
              onClick={() => setShowPortal(false)}
            />
            <div className="z-50 p-10 mx-0 w-full max-w-[95rem] h-5/6 rounded-lg shadow-lg md:mx-12 md:bg-white lg:mx-14 xl:mx-24">
              <h1>hello :)</h1>
            </div>
          </div>
        </Portal>
      )}
    </motion.article>
  );
}

Post.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  newImage: PropTypes.string,
};
