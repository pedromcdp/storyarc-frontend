import PostHeader from './PostHeader';
import PostDescription from './PostDescription';
import PropTypes from 'prop-types';
import PostImage from './PostImage';
import PosterFooter from './PosterFooter';

export default function Post({ username, avatar, timestamp, description }) {
  return (
    <article className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-2xl shadow-sm">
        <PostHeader name={username} avatar={avatar} timestamp={timestamp} />
        <PostDescription description={description} />
        <PostImage />
        <PosterFooter />
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
