import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { CakeIcon } from '@heroicons/react/solid';
import { QueryClient, dehydrate } from 'react-query';
import MainLayout from '../../layouts/MainLayout';
import useAuth from '../../hooks/auth';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import Avatar from '../../components/Profile/Avatar';
import ProfileData from '../../components/Profile/ProfileData';
import PostsTabs from '../../components/Profile/PostsTabs';
import { fetchUserPosts, fetchUserSavedPosts } from '../../utils/apiCalls';
import { useGetUserPosts, useGetUserSavedPosts } from '../../hooks/useAPI';

export default function Profile({ uid, token }) {
  const { user } = useAuth();
  const router = useRouter();
  const { data: ownPosts, isLoading, refetch } = useGetUserPosts(uid, token);
  const { data: savedPosts } = useGetUserSavedPosts(uid, token);

  if (!user) {
    router.replace('/');
    return null;
  }

  return (
    <MainLayout title={`storyarc | ${user.displayName}`}>
      <ProfileHeader>
        <Avatar user={user} />
      </ProfileHeader>
      <ProfileData>
        <h1 className="text-lg">{user.displayName}</h1>
        <p className="flex space-x-[0.15rem] text-gray-500">
          <CakeIcon className="w-4 h-4" />
          <span className="text-sm">{`Membro desde ${dayjs(
            parseInt(user.auth.currentUser.metadata.createdAt, 10),
          ).year()}`}</span>
        </p>
        <div className="flex divide-x divide-gray-600">
          <span className="pr-2 text-sm text-gray-500">
            <strong className="mr-1">{ownPosts?.length || 0}</strong>Publicações
            Próprias
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
        refetch={refetch}
        isLoading={isLoading}
      />
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
  await queryClient.prefetchQuery('userPosts', () =>
    fetchUserPosts(uid, token),
  );
  await queryClient.prefetchQuery('userSavedPosts', () =>
    fetchUserSavedPosts(uid, token),
  );

  return {
    props: { uid, token, preloadedState: dehydrate(queryClient) },
  };
}
