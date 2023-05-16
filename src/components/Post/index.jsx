import PropTypes from 'prop-types';
import { motion, useCycle } from 'framer-motion';
import { ChatAltIcon, ThumbUpIcon } from '@heroicons/react/outline';
// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
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
  likes,
  comments,
}) {
  const { user } = useAuth();
  const [showPortal, setShowPortal] = useCycle(false, true);
  // const [commentandLikeCount, setCommentandLikeCount] = useState({
  //   likes: 0 ?? likes,
  //   comments: 0 ?? comments,
  // });

  // useEffect(() => {
  //   const socket = io('http://localhost:8080');
  //   socket.emit('joinPostRoom', id);
  //   socket.on('likesCommentCount', (data) => {
  //     setCommentandLikeCount(data);
  //   });
  //   return () => {
  //     socket.emit('leavePostRoom');
  //     socket.disconnect();
  //   };
  // }, [id]);

  return (
    <motion.article initial={false} layout className="flex flex-col">
      <motion.div className="mt-5 rounded-2xl border bg-white px-5 pt-5 shadow-sm">
        <PostHeader
          name={username}
          avatar={avatar}
          timestamp={timestamp}
          id={id}
          uid={uid}
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
        <section
          id="comment-and-likes-count"
          className="my-2 flex items-center justify-end gap-2"
        >
          <div className="flex items-center gap-1 text-gray-500">
            <ThumbUpIcon className="h-5 w-5" />
            <span className="font-medium">{likes.length}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <ChatAltIcon className="h-5 w-5" />
            <span className="font-medium">{comments.length}</span>
          </div>
        </section>
        {user && (
          <>
            <PostFooter
              id={id}
              uid={uid}
              // setLikesAndComents={setCommentandLikeCount}
            />
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
