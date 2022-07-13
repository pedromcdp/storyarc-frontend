import { BellIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/auth';
import { useGetUserNotificationCount } from '../../hooks/useQuery';

export default function NotificationButton() {
  const { token } = useAuth();
  const { data } = useGetUserNotificationCount(token);
  const router = useRouter();
  const hasNotifications = data && data.notifications > 0;
  const handleClick = () => {
    router.push('/notifications');
  };

  return (
    <button
      role="link"
      aria-label="Notificações"
      className="relative p-1 mr-1 rounded-full transition duration-100 ease-in-out md:-mt-2 md:mr-0 lg:hover:bg-gray-100"
      onClick={handleClick}
    >
      <BellIcon className="w-6 h-6 text-verde" />
      {hasNotifications && (
        <span
          className={`absolute top-0 -right-1 ${
            data.notifications === 1 ? 'px-[0.45rem]' : 'px-1.5'
          } text-xs font-medium text-white bg-red-500 rounded-lg`}
        >
          {data.notifications}
        </span>
      )}
    </button>
  );
}
