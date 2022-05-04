import { HeartIcon, BookmarkIcon } from '@heroicons/react/outline';

export default function PostFooter({
  showComments,
  setShowComments,
  currentUser,
}) {
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
          <button className="postInputBtn">
            <HeartIcon className="w-6 h-6" />
            <span className="text-sm">Gostar da publicação</span>
          </button>
          <button className="postInputBtn">
            <BookmarkIcon className="w-6 h-6" />
            <span className="text-sm">Guardar publicação</span>
          </button>
        </div>
      )}
    </>
  );
}
