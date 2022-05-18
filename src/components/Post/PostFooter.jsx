import { HeartIcon, BookmarkIcon } from '@heroicons/react/outline';
import {
  HeartIcon as SolidHeartIcon,
  BookmarkIcon as SolidBookmarkIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';

export default function PostFooter({
  showComments,
  setShowComments,
  currentUser,
}) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

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
      {currentUser && (
        <div className="flex justify-evenly items-center border-t">
          <button
            className="transition-all duration-75 ease-in-out postInputBtn"
            onClick={handleLike}
          >
            {liked ? (
              <>
                <SolidHeartIcon className="w-6 h-6 text-verde" />
                <span className="text-sm">Gosto</span>
              </>
            ) : (
              <>
                <HeartIcon className="w-6 h-6" />
                <span className="text-sm">Gostar da publicação</span>
              </>
            )}
          </button>
          <button
            className="transition-all duration-75 ease-in-out postInputBtn"
            onClick={handleBookmark}
          >
            {bookmarked ? (
              <>
                <SolidBookmarkIcon className="w-6 h-6 text-verde" />
                <span className="text-sm">Publicação Guardada</span>
              </>
            ) : (
              <>
                <BookmarkIcon className="w-6 h-6" />
                <span className="text-sm">Guardar publicação</span>
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
