import { HeartIcon, BookmarkIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/solid';

export default function PostFooter() {
  return (
    <div className="border-t flex justify-evenly items-center">
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
