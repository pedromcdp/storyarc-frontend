import Link from 'next/link';
import { BellIcon } from '@heroicons/react/outline';
import useAuth from '../../hooks/auth';
import { useGetUserNotifications } from '../../hooks/useQuery';

export default function NotificationButton() {
  const { token } = useAuth();
  const { data } = useGetUserNotifications(token);
  const hasNotifications = data && data.unreadCount > 0;

  return (
    <Link href="/notifications" passHref>
      <a className="relative p-1 mr-1 rounded-full transition duration-100 ease-in-out md:-mt-2 md:mr-0 lg:hover:bg-gray-100">
        <BellIcon className="w-6 h-6 text-verde" />
        {hasNotifications && (
          <span
            className={`absolute top-0 -right-1 ${
              data.unreadCount === 1 ? 'px-[0.45rem]' : 'px-1.5'
            } text-xs font-medium text-white bg-red-500 rounded-lg`}
          >
            {data.unreadCount}
          </span>
        )}
      </a>
    </Link>
  );
}
