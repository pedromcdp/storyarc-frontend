import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { TrashIcon } from '@heroicons/react/outline';
import propTypes from 'prop-types';
import useAuth from '../../hooks/auth';
import { useDeletePost } from '../../hooks/useMutation';

export default function CardView({ post }) {
  const { user, token } = useAuth();
  const { mutate: deletePost } = useDeletePost();

  const handlePostDelete = async () => {
    deletePost({
      postId: post._id,
      token,
    });
  };

  return (
    <article className="mb-2 flex h-36 rounded-md border bg-white shadow-sm lg:h-48">
      <div className="relative h-full min-w-[33%] rounded-l-md">
        <Image
          src={post.photo}
          alt={`foto de ${post.description}`}
          layout="fill"
          className="pointer-events-none rounded-l-md object-cover"
          priority
        />
      </div>
      <div className="grow p-2">
        <div className="flex h-1/3 items-start justify-between">
          <Link
            href={{
              pathname: `/post/${post._id}`,
              query: {
                id: post.id,
              },
            }}
            as={`/post/${post._id}`}
            passHref
          >
            <p className="cursor-pointer">{post.description}</p>
          </Link>
          {user.uid === post.user._id && (
            <button
              aria-label="Apagar publicação"
              className="rounded-full p-1 transition-colors duration-75 ease-in-out hover:bg-gray-100 hover:text-red-500"
              onClick={handlePostDelete}
            >
              <TrashIcon className="h-6 w-6" />
            </button>
          )}
        </div>
        <div className="flex h-2/3 items-end gap-1.5">
          <div className="relative h-9 w-9 rounded-full border bg-gray-100 shadow-sm">
            <Image
              src={post.user.avatar}
              alt={`foto de perfil de ${post.user.name}`}
              layout="fill"
              className="squircleMask object-contain object-center"
              priority
            />
          </div>
          <div>
            <h1 className="text-sm">{post.user.name}</h1>
            <p className="text-xs text-gray-500">
              Publicado {dayjs(post.createdAt).fromNow()}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

CardView.propTypes = {
  post: propTypes.object.isRequired,
  ownPost: propTypes.bool,
  refetch: propTypes.func,
};
