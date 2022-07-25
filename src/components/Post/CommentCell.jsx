/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import Image from 'next/image';
import dayjs from 'dayjs';
import { ClockIcon, TrashIcon } from '@heroicons/react/outline';

import useAuth from '../../hooks/auth';
import {
  useDeleteComment,
  useRemoveNotification,
} from '../../hooks/useMutation';

export default function CommentCell({ comment, postId }) {
  const { user, token } = useAuth();
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: removeNotification } = useRemoveNotification();

  const handleDelete = () => {
    deleteComment({ id: comment._id, postId });
    removeNotification({
      id: postId,
      token,
    });
  };

  return (
    <div
      className={`flex items-start gap-2 h-auto ${
        user?.uid === comment.user._id && 'justify-end'
      }`}
    >
      <div
        className={`relative flex-none w-10 h-10 rounded-full shadow-sm ${
          user?.uid === comment.user._id && 'order-2'
        }`}
      >
        <Image
          alt={comment.user.name}
          src={comment.user.avatar}
          layout="fill"
          className="object-contain mask mask-squircle"
        />
      </div>
      <div
        tabIndex={0}
        className={`group relative ${
          user?.uid === comment.user._id
            ? 'pr-4 hover:pr-2 bg-gradient-to-b from-verde to-green-500 text-white rounded-l-2xl rounded-br-2xl '
            : 'pr-4 rounded-r-2xl rounded-bl-2xl '
        } pl-2 pt-1 pb-2 max-w-full border drop-shadow-sm transition duration-150 hover:ease-in`}
      >
        <div className="flex justify-between space-x-1">
          <p className="text-sm font-medium">{comment.user.name}</p>
          {user?.uid === comment.user._id && (
            <button
              onClick={handleDelete}
              className="hidden group-hover:inline-block"
            >
              <TrashIcon className="w-4 h-4 hover:text-red-500 transition-colors duration-75 ease-out" />
            </button>
          )}
        </div>
        <div
          className={`flex items-center pb-1 space-x-1 text-[0.65rem] font-medium ${
            user?.uid === comment.user._id ? 'text-gray-100' : 'text-gray-600'
          }`}
        >
          <ClockIcon className="w-3 h-3" />
          <p>{dayjs(comment.createdAt).fromNow()}</p>
        </div>
        <p className="text-[0.8rem]">{comment.body}</p>
      </div>
    </div>
  );
}
