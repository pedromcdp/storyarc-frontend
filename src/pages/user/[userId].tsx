import React from 'react';
import { QueryClient, dehydrate } from 'react-query';
import { CakeIcon } from '@heroicons/react/solid';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { apiUrl } from '../../utils/appUrls';
import MainLayout from '../../layouts/MainLayout';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileData from '../../components/Profile/ProfileData';
import Avatar from '../../components/Profile/Avatar';
import { useGetUser } from '../../hooks/useQuery';

export default function UserPage({ id }) {
  const { replace } = useRouter();
  const { data: user, isLoading, isFetching } = useGetUser(id);

  if (isLoading || isFetching) {
    return (
      <MainLayout title={`storyarc | loading`}>
        <div className="flex h-screen items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-y-2 border-verde" />
        </div>
      </MainLayout>
    );
  }

  if (!user.success) {
    replace('/404', `${id}`, { shallow: true });
    return null;
  }

  return (
    <MainLayout title={`storyarc | ${user.name}`}>
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
        <ProfileHeader>
          <Avatar user={user} />
        </ProfileHeader>
        <ProfileData>
          <h1 className="text-lg">{user.name}</h1>
          <p className="flex space-x-[0.15rem] text-gray-500">
            <CakeIcon className="h-4 w-4" />
            <span className="text-sm">{`Membro desde ${dayjs(
              user.createdAt,
            ).year()}`}</span>
          </p>
          <div className="flex divide-x divide-gray-400">
            <span className="pr-2 text-sm text-gray-500">
              <strong className="mr-1">{user.userPosts.length}</strong>
              Publicações Próprias
            </span>
            <span className="pl-2 text-sm text-gray-500">
              <strong className="mr-1">{user.savedPosts.length}</strong>
              Publicações Guardadas
            </span>
          </div>
        </ProfileData>
      </motion.div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { userId } = params;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery(['user', userId], () =>
    fetch(`${apiUrl}/users/${userId}`).then((res) => res.json()),
  );

  return {
    props: {
      id: userId,
      preloadedState: dehydrate(queryClient),
    },
  };
}
