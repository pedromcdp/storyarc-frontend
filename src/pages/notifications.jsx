/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { CollectionIcon, TrashIcon } from '@heroicons/react/outline';
import { useEffect } from 'react';
import NotificationPageContainer from '../components/Notification/NotificationPageContainer';
import NotificationPageItem from '../components/Notification/NotificationPageItem';
import useAuth from '../hooks/auth';
import { useGetUserNotifications } from '../hooks/useQuery';
import MainLayout from '../layouts/MainLayout';
import {
  useClearNotifications,
  useMarkNotificationsAsRead,
} from '../hooks/useMutation';

export default function Notifications() {
  const { user, token } = useAuth();
  const router = useRouter();
  const { data: notificationData } = useGetUserNotifications(token);
  const { mutate: clearNotifications } = useClearNotifications();
  const { mutate: markNotificationsAsRead } = useMarkNotificationsAsRead();

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        markNotificationsAsRead(token);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!user) {
    router.replace('/');
    return null;
  }

  return (
    <MainLayout title="Notifications">
      <NotificationPageContainer>
        <div className="flex justify-between items-center pb-1 border-b">
          <div className="flex space-x-2">
            <CollectionIcon className="w-6 h-6 text-verde" />
            <h1 className="text-lg font-semibold">Notificações</h1>
          </div>
          <button
            className="p-1 rounded-full lg:hover:bg-gray-100"
            onClick={() => clearNotifications(token)}
          >
            <TrashIcon className="w-6 h-6 text-verde" />
          </button>
        </div>
        {notificationData?.notifications.length ? (
          notificationData?.notifications.map((notification) => (
            <NotificationPageItem
              key={notification._id}
              notification={notification}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            De momento não tens notificações
          </p>
        )}
      </NotificationPageContainer>
    </MainLayout>
  );
}
