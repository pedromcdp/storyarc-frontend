import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState } from 'react';
import PostHeader from './PostHeader';
import PostDescription from './PostDescription';
import PostImage from './PostImage';
import PostFooter from './PostFooter';
import CommentInput from './CommentInput';
import CommentsContainer from './CommentsContainer';
import useAuth from '../../hooks/auth';

export default function Post({ id, username, avatar, timestamp, description }) {
  const [showComments, setShowComments] = useState(false);
  const { user } = useAuth();

  return (
    <motion.article initial={false} layout className="flex flex-col">
      <motion.div className="px-5 pt-5 mt-5 bg-white rounded-2xl border shadow-sm">
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
          currentUser={user}
        />
        {user && (
          <>
            <CommentInput user={user} />
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
