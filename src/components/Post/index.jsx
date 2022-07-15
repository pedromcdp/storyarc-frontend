import PropTypes from 'prop-types';
import { motion, useCycle } from 'framer-motion';
import PostHeader from './PostHeader';
import PostDescription from './PostDescription';
import PostImage from './PostImage';
import PostFooter from './PostFooter';
import CommentInput from './CommentInput';
import CommentsContainer from './CommentsContainer';
import FullScreenView from './FullScreenView';
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
  const [showPortal, setShowPortal] = useCycle(false, true);

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
          openPortal={setShowPortal}
        />
        <div className="mt-2" />
        {user && (
          <>
            <PostFooter id={id} uid={uid} />
            <CommentInput user={user} id={id} uid={uid} />
          </>
        )}
        <CommentsContainer id={id} />
      </motion.div>
      <FullScreenView
        showPortal={showPortal}
        setShowPortal={setShowPortal}
        image={image}
        newImage={newImage}
        description={description}
      />
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
