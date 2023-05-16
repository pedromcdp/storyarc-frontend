import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { CakeIcon } from '@heroicons/react/solid';
import { QueryClient, dehydrate } from 'react-query';
import { motion } from 'framer-motion';
import MainLayout from '../../layouts/MainLayout';
import useAuth from '../../hooks/auth';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import Avatar from '../../components/Profile/Avatar';
import ProfileData from '../../components/Profile/ProfileData';
import PostsTabs from '../../components/Profile/PostsTabs';
import { fetchUserPosts, fetchUserSavedPosts } from '../../utils/apiCalls';
import { useGetUserPosts, useGetUserSavedPosts } from '../../hooks/useQuery';

export default function Profile({ uid, token }) {
  const { user } = useAuth();
  const router = useRouter();
  const { data: ownPosts, isLoading } = useGetUserPosts(uid, token);
  const { data: savedPosts } = useGetUserSavedPosts(uid, token);

  if (!user) {
    router.replace('/');
    return null;
  }

  return (
    <MainLayout title={`storyarc | ${user.displayName}`}>
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
          <h1 className="text-lg">{user.displayName}</h1>
          <p className="flex space-x-[0.15rem] text-gray-500">
            <CakeIcon className="h-4 w-4" />
            <span className="text-sm">{`Membro desde ${dayjs(
              parseInt(user.auth.currentUser.metadata.createdAt, 10),
            ).year()}`}</span>
          </p>
          <div className="flex divide-x divide-gray-600">
            <span className="pr-2 text-sm text-gray-500">
              <strong className="mr-1">{ownPosts?.length || 0}</strong>
              Publicações Próprias
            </span>
            <span className="pl-2 text-sm text-gray-500">
              <strong className="mr-1">
                {savedPosts?.savedPosts.length || 0}
              </strong>
              Publicações Guardadas
            </span>
          </div>
        </ProfileData>
        <PostsTabs
          ownPosts={ownPosts}
          savedPosts={savedPosts}
          isLoading={isLoading}
        />
      </motion.div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { uid, token } = context.query;
  if (!uid || !token) {
    context.res.writeHead(302, {
      Location: '/',
    });
    context.res.end();
    return { props: {} };
  }
  const queryClient = new QueryClient();
  queryClient.prefetchQuery(['userPosts', uid], () =>
    fetchUserPosts(uid, token),
  );
  queryClient.prefetchQuery(['userSavedPosts', uid], () =>
    fetchUserSavedPosts(uid, token),
  );

  return {
    props: { uid, token, preloadedState: dehydrate(queryClient) },
  };
}
