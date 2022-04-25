import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState } from 'react';
import PostHeader from './PostHeader';
import PostDescription from './PostDescription';
import PostImage from './PostImage';
import PostFooter from './PostFooter';
import CommentInput from './CommentInput';
import CommentsContainer from './CommentsContainer';

export default function Post({ username, avatar, timestamp, description }) {
  const [currentUser, setCurrentUser] = useState(true);
  const [showComments, setShowComments] = useState(false);

  return (
    <motion.article initial={false} layout className="flex flex-col">
      <motion.div className="px-5 pt-5 mt-5 bg-white rounded-2xl shadow-sm">
        <PostHeader name={username} avatar={avatar} timestamp={timestamp} />
        <PostDescription description={description} />
        <PostImage />
        <PostFooter
          setShowComments={setShowComments}
          showComments={showComments}
          currentUser={currentUser}
        />
        {currentUser && (
          <>
            <CommentInput avatar={avatar} username={username} />
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
