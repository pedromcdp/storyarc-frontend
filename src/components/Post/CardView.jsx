import Link from 'next/link';
import propTypes from 'prop-types';

export default function CardView({ post }) {
  return (
    <Link
      href={{
        pathname: `/post/${post.id}`,
        query: {
          id: post.id,
        },
      }}
      as={`/post/${post.id}`}
      passHref
    >
      <article className="flex h-36 bg-white rounded-md border shadow-sm cursor-pointer lg:h-48">
        <div className="relative w-4/12 min-w-[8rem] h-full bg-pink-200 rounded-l-md" />
        <div className="grow p-2">
          <div className="h-1/3">Post Title</div>
          <div className="flex gap-1.5 items-end h-2/3">
            <div className="w-10 h-10 bg-blue-800 rounded-full border shadow-sm lg:w-12 lg:h-12" />
            <div>
              <h1 className="text-sm">Maria Luísa da Silva</h1>
              <p className="text-xs text-gray-500">Publicado há 3 semanas</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

CardView.propTypes = {
  post: propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
    createdAt: propTypes.string.isRequired,
    updatedAt: propTypes.string.isRequired,
    user: propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      email: propTypes.string.isRequired,
      createdAt: propTypes.string.isRequired,
      updatedAt: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
