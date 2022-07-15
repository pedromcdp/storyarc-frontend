import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { pageUrl } from '../../utils/appUrls';

export default function NotificationPageItem({ notification }) {
  const { fromUser, createdAt, type, post, read } = notification;

  return (
    <Link href={`${pageUrl}/post/${post._id}`} passHref>
      <div
        className={`flex p-4 space-x-2 bg-white rounded-2xl border transition-shadow duration-100 ease-in-out ${
          !read ? 'shadow-md' : 'shadow-sm'
        } cursor-pointer`}
      >
        <div className="flex flex-none">
          <Image
            src={fromUser.avatar}
            width={45}
            height={45}
            alt={`Foto de perfil de ${fromUser.name}`}
            layout="fixed"
            className="mask mask-squircle"
          />
        </div>
        <div className="flex flex-col mt-1 space-y-1">
          <p className="leading-5 text-verde">
            <span className="font-medium text-black">{fromUser.name}</span>{' '}
            {type === 'like' ? 'gostou da' : 'comentou a'} tua publicação
            <span className="font-medium text-black"> {post.description}</span>
          </p>
          <p className="text-sm text-gray-600">
            <span className="">{dayjs(createdAt).fromNow()}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
