import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { pageUrl } from '../../utils/appUrls';
import { useMarkNotificationsAsRead } from '../../hooks/useMutation';
import useAuth from '../../hooks/auth';

export default function NotificationPageItem({ notification }) {
  const { fromUser, createdAt, type, post } = notification;
  const { mutate: markNotificationsAsRead } = useMarkNotificationsAsRead();
  const { token } = useAuth();

  if (!post) {
    return;
  }

  return (
    <Link href={`${pageUrl}/post/${post._id}`} passHref>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -20,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={`flex cursor-pointer items-center space-x-2 rounded-t-xl border-b p-4 transition duration-100 ease-in-out hover:bg-gray-50`}
        onMouseEnter={() => markNotificationsAsRead(token)}
      >
        <div className="flex flex-none">
          <Image
            src={fromUser.avatar}
            width={45}
            height={45}
            alt={`Foto de perfil de ${fromUser.name}`}
            className="mask mask-squircle object-center"
          />
        </div>
        <div className="mt-1 flex flex-col space-y-1">
          <p className="leading-5 text-verde">
            <span className="font-medium text-black">{fromUser.name}</span>{' '}
            {type === 'like' ? 'gostou da' : 'comentou a'} tua publicação
            <span className="font-medium text-black"> {post.description}</span>
          </p>
          <p className="text-sm text-gray-600">
            <span className="">{dayjs(createdAt).fromNow()}</span>
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
