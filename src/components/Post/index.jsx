import PostHeader from './PostHeader';
import PostDescription from './PostDescription';
import PropTypes from 'prop-types';
import PostImage from './PostImage';
import PostFooter from './PostFooter';
import CommentInput from './CommentInput';
export default function Post({ username, avatar, timestamp, description }) {
  const currentUser = false;
  return (
    <article className="flex flex-col">
      <div className="pt-5 px-5 bg-white mt-5 rounded-2xl shadow-sm">
        <PostHeader name={username} avatar={avatar} timestamp={timestamp} />
        <PostDescription description={description} />
        <PostImage />
        <PostFooter />
        {currentUser && <CommentInput avatar={avatar} username={username} />}
      </div>
    </article>
  );
}

Post.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
