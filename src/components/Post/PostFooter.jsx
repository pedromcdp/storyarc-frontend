/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  Bookmark24Filled,
  Bookmark24Regular,
  ThumbLike24Filled,
  ThumbLike24Regular,
} from '@fluentui/react-icons';
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/auth';
import { showNotification } from '../../features/notification/notificationSlice';
import {
  useGetUserLikedPosts,
  useGetUserSavedPosts,
} from '../../hooks/useQuery';
import {
  useCreateNotification,
  useDislikePost,
  useLikePost,
  useRemoveNotification,
  useSavePost,
  useUnsavePost,
} from '../../hooks/useMutation';

export default function PostFooter({ id, uid }) {
  const { user, token } = useAuth();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { data: userSavedPostsData } = useGetUserSavedPosts(user?.uid, token);
  const { data: userLikedPostsData } = useGetUserLikedPosts(user?.uid, token);
  const { mutate: likePost } = useLikePost();
  const { mutate: dislikePost } = useDislikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: unsavePost } = useUnsavePost();
  const { mutate: sendNotification } = useCreateNotification();
  const { mutate: removeNotification } = useRemoveNotification();
  const dispatch = useDispatch();

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      likePost({
        id: user.uid,
        postId: id,
        token,
      });
      if (user.uid !== uid) {
        sendNotification({
          id: uid,
          token,
          notification: {
            post: id,
            type: 'like',
          },
        });
      }
    } else {
      setLiked(false);
      dislikePost({
        id: user.uid,
        postId: id,
        token,
      });
      removeNotification({
        id,
        token,
      });
    }
  };

  const handleBookmark = () => {
    if (!bookmarked) {
      setBookmarked(true);
      savePost({
        id: user.uid,
        postId: id,
        token,
      });
      dispatch(
        showNotification({
          type: 'success',
          title: 'Publicação guardada',
        }),
      );
    } else {
      setBookmarked(false);
      unsavePost({
        id: user.uid,
        postId: id,
        token,
      });
    }
  };

  useEffect(() => {
    if (userSavedPostsData) {
      const { savedPosts } = userSavedPostsData;
      const isBookmarked = savedPosts.some((post) => post._id === id);
      setBookmarked(Boolean(isBookmarked));
    }
    if (userLikedPostsData) {
      const { likedPosts } = userLikedPostsData;
      const isLiked = likedPosts.some((post) => post._id === id);
      setLiked(Boolean(isLiked));
    }
  }, [userSavedPostsData, userLikedPostsData]);

  return (
    <div className="flex justify-evenly items-center border-t">
      <button
        className="group transition-all duration-75 ease-in-out postInputBtn"
        onClick={handleLike}
      >
        {liked ? (
          <>
            <ThumbLike24Filled className="w-6 h-6 text-verde" />
            <span className="text-sm">Gosto</span>
          </>
        ) : (
          <>
            <ThumbLike24Regular className="w-6 h-6 group-hover:text-verde" />
            <span className="text-sm group-hover:text-verde">
              Gostar da publicação
            </span>
          </>
        )}
      </button>
      <button
        className="group transition-all duration-75 ease-in-out postInputBtn"
        onClick={handleBookmark}
      >
        {bookmarked ? (
          <>
            <Bookmark24Filled className="w-6 h-6 text-verde" />
            <span className="text-sm">Publicação Guardada</span>
          </>
        ) : (
          <>
            <Bookmark24Regular className="w-6 h-6 group-hover:text-verde" />
            <span className="text-sm group-hover:text-verde">
              Guardar publicação
            </span>
          </>
        )}
      </button>
    </div>
  );
}
