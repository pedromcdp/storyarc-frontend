/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import Image from 'next/image';
import dayjs from 'dayjs';
import { ClockIcon, TrashIcon } from '@heroicons/react/outline';

import Link from 'next/link';
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
      className={`flex h-auto items-start gap-2 ${
        user?.uid === comment.user._id && 'justify-end'
      }`}
    >
      <div
        className={`relative h-10 w-10 flex-none rounded-full shadow-sm ${
          user?.uid === comment.user._id && 'order-2'
        }`}
      >
        <Link href={`/user/${comment.user._id}`} passHref>
          <Image
            alt={comment.user.name}
            src={comment.user.avatar}
            layout="fill"
            className="mask mask-squircle cursor-pointer object-contain"
          />
        </Link>
      </div>
      <div
        tabIndex={0}
        className={`group relative ${
          user?.uid === comment.user._id
            ? 'rounded-l-2xl rounded-br-2xl bg-gradient-to-b from-verde to-green-500 pr-4 text-white hover:pr-2 '
            : 'rounded-r-2xl rounded-bl-2xl pr-4 '
        } max-w-full border pb-2 pl-2 pt-1 drop-shadow-sm transition duration-150 hover:ease-in`}
      >
        <div className="flex justify-between space-x-1">
          <Link href={`/user/${comment.user._id}`} passHref>
            <p className="cursor-pointer text-sm font-medium">
              {comment.user.name}
            </p>
          </Link>
          {user?.uid === comment.user._id && (
            <button
              onClick={handleDelete}
              className="hidden group-hover:inline-block"
            >
              <TrashIcon className="h-4 w-4 transition-colors duration-75 ease-out hover:text-red-500" />
            </button>
          )}
        </div>
        <div
          className={`flex items-center space-x-1 pb-1 text-[0.65rem] font-medium ${
            user?.uid === comment.user._id ? 'text-gray-100' : 'text-gray-600'
          }`}
        >
          <ClockIcon className="h-3 w-3" />
          <p>{dayjs(comment.createdAt).fromNow()}</p>
        </div>
        <p className="text-[0.8rem]">{comment.body}</p>
      </div>
    </div>
  );
}
