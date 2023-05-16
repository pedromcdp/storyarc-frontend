/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { CollectionIcon, TrashIcon } from '@heroicons/react/outline';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const { data: notificationData, isLoading } = useGetUserNotifications(token);
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

  const FragmentToRenderr = () => {
    if (isLoading) {
      return (
        <p className="text-center text-gray-500">A carregar notificações</p>
      );
    }
    if (notificationData && notificationData.notifications.length) {
      return notificationData.notifications.map((notification) => (
        <NotificationPageItem
          key={notification._id}
          notification={notification}
        />
      ));
    }
    return (
      <p className="text-center text-gray-500">
        De momento não tens notificações
      </p>
    );
  };

  return (
    <MainLayout title="storyarc | notificações">
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 10,
          scale: 0.95,
        }}
        transition={{
          duration: 0.3,
          transition: 'easeInOut',
        }}
      >
        <NotificationPageContainer>
          <div className="flex items-center justify-between border-b pb-1">
            <div className="flex space-x-2">
              <CollectionIcon className="h-6 w-6 text-verde" />
              <h1 className="text-lg font-semibold">Notificações</h1>
            </div>
            <button
              className="rounded-full p-1 lg:hover:bg-gray-50"
              onClick={() => clearNotifications(token)}
            >
              <TrashIcon className="h-6 w-6 text-verde" />
            </button>
          </div>
          {FragmentToRenderr()}
        </NotificationPageContainer>
      </motion.div>
    </MainLayout>
  );
}
