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
      <a className="relative mr-1 rounded-full p-1 transition duration-100 ease-in-out lg:hover:bg-gray-100">
        <BellIcon className="h-[1.3rem] w-[1.3rem] text-verde" />
        {hasNotifications && (
          <span
            className={`absolute -right-1 top-0 ${
              data.unreadCount === 1 ? 'px-[0.45rem]' : 'px-1.5'
            } rounded-lg bg-red-500 text-xs font-medium text-white`}
          >
            {data.unreadCount}
          </span>
        )}
      </a>
    </Link>
  );
}
