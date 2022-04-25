import PostHeader from './PostHeader';
import PostDescription from './PostDescription';
import PropTypes from 'prop-types';
import PostImage from './PostImage';
import PostFooter from './PostFooter';
import CommentInput from './CommentInput';
import { motion } from 'framer-motion';
import { useState } from 'react';
export default function Post({ username, avatar, timestamp, description }) {
  const [currentUser, setCurrentUser] = useState(false);

  return (
    <motion.article initial={false} layout className="flex flex-col">
      <div className="pt-5 px-5 bg-white mt-5 rounded-2xl shadow-sm">
        <PostHeader name={username} avatar={avatar} timestamp={timestamp} />
        <PostDescription description={description} />
        <PostImage />
        {currentUser && (
          <>
            <PostFooter />
            <CommentInput avatar={avatar} username={username} />
          </>
        )}
      </div>
    </motion.article>
  );
}

Post.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
