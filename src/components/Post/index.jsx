import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PostHeader from './PostHeader';
import PostDescription from './PostDescription';
import PostImage from './PostImage';
import PostFooter from './PostFooter';
import CommentInput from './CommentInput';
import CommentsContainer from './CommentsContainer';
import { useUser } from '../../features/auth/authSlice';

export default function Post({ id, username, avatar, timestamp, description }) {
  const [showComments, setShowComments] = useState(false);
  const currentUser = useSelector(useUser);

  return (
    <motion.article initial={false} layout className="flex flex-col">
      <motion.div className="px-5 pt-5 mt-5 bg-white rounded-2xl shadow-sm">
        <PostHeader
          name={username}
          avatar={avatar}
          timestamp={timestamp}
          id={id}
        />
        <PostDescription description={description} />
        <PostImage />
        <PostFooter
          setShowComments={setShowComments}
          showComments={showComments}
          currentUser={currentUser}
        />
        {currentUser && (
          <>
            <CommentInput user={currentUser} />
          </>
        )}
        {showComments && <CommentsContainer />}
      </motion.div>
    </motion.article>
  );
}

Post.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
