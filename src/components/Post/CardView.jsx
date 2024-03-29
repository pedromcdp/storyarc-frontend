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
    <article className="flex mb-2 h-36 bg-white rounded-md border shadow-sm lg:h-48">
      <div className="relative min-w-[33%] h-full rounded-l-md">
        <Image
          src={post.photo}
          alt={`foto de ${post.description}`}
          layout="fill"
          className="object-cover rounded-l-md pointer-events-none"
          priority
        />
      </div>
      <div className="grow p-2">
        <div className="flex justify-between items-start h-1/3">
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
              className="p-1 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors duration-75 ease-in-out"
              onClick={handlePostDelete}
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          )}
        </div>
        <div className="flex gap-1.5 items-end h-2/3">
          <div className="relative w-10 h-10 bg-blue-800 rounded-full border shadow-sm lg:w-12 lg:h-12">
            <Image
              src={post.user.avatar}
              alt={`foto de perfil de ${post.user.name}`}
              layout="fill"
              className="object-contain object-center rounded-full"
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
