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
  useGetUserSavedPostsQuery,
  useGetUserLikedPostsQuery,
} from '../../services/storyarc';

export default function PostFooter({ showComments, setShowComments, id }) {
  const { user, token } = useAuth();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [savePost, savePostResult] = useSavePostMutation();
  const [unsavePost, unsavePostResult] = useUnsavePostMutation();
  const [likePost, likePostResult] = useLikePostMutation();
  const [dislikePost, dislikePostResult] = useDislikePostMutation();
  const { data: userSavedPostsData, refetch: revalidateSavedPosts } =
    useGetUserSavedPostsQuery({
      uid: user?.uid,
      token,
    });
  const { data: userLikedPostsData, refetch: revalidateLikes } =
    useGetUserLikedPostsQuery({
      uid: user?.uid,
      token,
    });

  const handleLike = () => {
    if (!liked) {
      likePost({
        id: user.uid,
        postId: id,
        token,
      });
      setLiked(true);
    } else {
      dislikePost({
        id: user.uid,
        postId: id,
        token,
      });
      setLiked(false);
    }
  };

  const handleBookmark = () => {
    if (!bookmarked) {
      savePost({
        id: user.uid,
        postId: id,
        token,
      });
      setBookmarked(true);
    } else {
      unsavePost({
        id: user.uid,
        postId: id,
        token,
      });
      setBookmarked(false);
    }
  };

  useEffect(() => {
    if (savePostResult.isSuccess || unsavePostResult.isSuccess) {
      revalidateSavedPosts();
    }
    if (savePostResult.isUninitialized || unsavePostResult.isUninitialized) {
      if (userSavedPostsData) {
        const { savedPosts } = userSavedPostsData;
        const isBookmarked = savedPosts.some((post) => post._id === id);
        setBookmarked(Boolean(isBookmarked));
      }
    }
    if (likePostResult.isSuccess || dislikePostResult.isSuccess) {
      revalidateLikes();
    }
    if (likePostResult.isUninitialized || dislikePostResult.isUninitialized) {
      if (userLikedPostsData) {
        const { likedPosts } = userLikedPostsData;
        const isLiked = likedPosts.some((post) => post._id === id);
        setLiked(Boolean(isLiked));
      }
    }
  }, [
    likePostResult,
    dislikePostResult,
    revalidateLikes,
    revalidateSavedPosts,
    userLikedPostsData,
    userSavedPostsData,
    savePostResult,
    unsavePostResult,
  ]);

  return (
    <>
      <div className="flex justify-end my-1">
        <button
          className="py-[0.35rem] px-2 text-sm hover:bg-gray-100 rounded-xl"
          onClick={() => setShowComments(!showComments)}
        >
          {!showComments ? 'Ver comentários' : 'Fechar comentários'}
        </button>
      </div>
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
    </>
  );
}
