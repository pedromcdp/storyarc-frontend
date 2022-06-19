/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { HeartIcon, BookmarkIcon } from '@heroicons/react/outline';
import {
  HeartIcon as SolidHeartIcon,
  BookmarkIcon as SolidBookmarkIcon,
} from '@heroicons/react/solid';
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
    <div className="mt-2">
      {user && (
        <div className="flex justify-evenly items-center border-t">
          <button
            className="group transition-all duration-75 ease-in-out postInputBtn"
            onClick={handleLike}
          >
            {liked ? (
              <>
                <SolidHeartIcon className="w-6 h-6 text-verde" />
                <span className="text-sm">Gosto</span>
              </>
            ) : (
              <>
                <HeartIcon className="w-6 h-6 group-hover:text-verde" />
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
                <SolidBookmarkIcon className="w-6 h-6 text-verde" />
                <span className="text-sm">Publicação Guardada</span>
              </>
            ) : (
              <>
                <BookmarkIcon className="w-6 h-6 group-hover:text-verde" />
                <span className="text-sm group-hover:text-verde">
                  Guardar publicação
                </span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
