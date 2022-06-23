/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  Bookmark24Filled,
  Bookmark24Regular,
  ThumbLike24Filled,
  ThumbLike24Regular,
} from '@fluentui/react-icons';

import useAuth from '../../hooks/auth';
import {
  useLikePostMutation,
  useDislikePostMutation,
  useSavePostMutation,
  useUnsavePostMutation,
} from '../../services/storyarc';
import { useGetUserLikedPosts, useGetUserSavedPosts } from '../../hooks/useAPI';

export default function PostFooter({ id }) {
  const { user, token } = useAuth();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [savePost] = useSavePostMutation();
  const [unsavePost] = useUnsavePostMutation();
  const [likePost] = useLikePostMutation();
  const [dislikePost] = useDislikePostMutation();
  const { data: userSavedPostsData, refetch: revalidateSavedPosts } =
    useGetUserSavedPosts(user?.uid, token);
  const { data: userLikedPostsData, refetch: revalidateLikes } =
    useGetUserLikedPosts(user?.uid, token);

  const handleLike = async () => {
    if (!liked) {
      setLiked(true);
      const { data } = await likePost({
        id: user.uid,
        postId: id,
        token,
      });
      if (data) {
        revalidateLikes();
      }
    } else {
      setLiked(false);
      const { data } = await dislikePost({
        id: user.uid,
        postId: id,
        token,
      });
      if (data) {
        revalidateLikes();
      }
    }
  };

  const handleBookmark = async () => {
    if (!bookmarked) {
      setBookmarked(true);
      const { data } = await savePost({
        id: user.uid,
        postId: id,
        token,
      });
      if (data) {
        revalidateSavedPosts();
      }
    } else {
      setBookmarked(false);
      const { data } = await unsavePost({
        id: user.uid,
        postId: id,
        token,
      });
      if (data) {
        revalidateSavedPosts();
      }
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
            <ThumbLike24Filled className="text-verde" />
            <span className="text-sm">Gosto</span>
          </>
        ) : (
          <>
            <ThumbLike24Regular className="group-hover:text-verde" />
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
            <Bookmark24Filled className="text-verde" />
            <span className="text-sm">Publicação Guardada</span>
          </>
        ) : (
          <>
            <Bookmark24Regular className="group-hover:text-verde" />
            <span className="text-sm group-hover:text-verde">
              Guardar publicação
            </span>
          </>
        )}
      </button>
    </div>
  );
}
