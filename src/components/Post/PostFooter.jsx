import { HeartIcon, BookmarkIcon } from '@heroicons/react/outline';

export default function PostFooter() {
  return (
    <div className="mt-2 border-y flex justify-evenly items-center">
      <button className="postInputBtn">
        <HeartIcon className="w-6 h-6" />
        <span className="text-sm">Gostar da publicação</span>
      </button>
      <button className="postInputBtn">
        <BookmarkIcon className="w-6 h-6" />
        <span className="text-sm">Guardar publicação</span>
      </button>
    </div>
  );
}
