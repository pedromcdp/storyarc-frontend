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
  useDislikePost,
  useLikePost,
  useSavePost,
  useUnsavePost,
} from '../../hooks/useMutation';

export default function PostFooter({ id, setLikesAndComents }) {
  const { user, token } = useAuth();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { data: userSavedPostsData } = useGetUserSavedPosts(user?.uid, token);
  const { data: userLikedPostsData } = useGetUserLikedPosts(user?.uid, token);
  const { mutate: likePost } = useLikePost();
  const { mutate: dislikePost } = useDislikePost();
  const { mutateAsync: savePost } = useSavePost();
  const { mutateAsync: unsavePost } = useUnsavePost();
  const dispatch = useDispatch();

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      // setLikesAndComents((prevState) => ({
      //   ...prevState,
      //   likes: prevState.likes + 1,
      // }));
      likePost({
        id: user.uid,
        postId: id,
        token,
      });
    } else {
      setLiked(false);
      // setLikesAndComents((prevState) => ({
      //   ...prevState,
      //   likes: prevState.likes - 1,
      // }));
      dislikePost({
        id: user.uid,
        postId: id,
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
    <div className="flex items-center justify-evenly border-t">
      <button
        className="postInputBtn group transition-all duration-75 ease-in-out"
        onClick={handleLike}
      >
        {liked ? (
          <>
            <ThumbLike24Filled className="h-6 w-6 text-verde" />
            <span className="text-sm">Gosto</span>
          </>
        ) : (
          <>
            <ThumbLike24Regular className="h-6 w-6 group-hover:text-verde" />
            <span className="text-sm group-hover:text-verde">
              Gostar da publicação
            </span>
          </>
        )}
      </button>
      <button
        className="postInputBtn group transition-all duration-75 ease-in-out"
        onClick={handleBookmark}
      >
        {bookmarked ? (
          <>
            <Bookmark24Filled className="h-6 w-6 text-verde" />
            <span className="text-sm">Publicação Guardada</span>
          </>
        ) : (
          <>
            <Bookmark24Regular className="h-6 w-6 group-hover:text-verde" />
            <span className="text-sm group-hover:text-verde">
              Guardar publicação
            </span>
          </>
        )}
      </button>
    </div>
  );
}
