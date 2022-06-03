import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { CakeIcon } from '@heroicons/react/solid';
import MainLayout from '../../layouts/MainLayout';
import useAuth from '../../hooks/auth';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import { wrapper } from '../../app/store';
import {
  getUserPosts,
  getUserSavedPosts,
  getRunningOperationPromises,
  useGetUserPostsQuery,
  useGetUserSavedPostsQuery,
} from '../../services/storyarc';
import Avatar from '../../components/Profile/Avatar';
import ProfileData from '../../components/Profile/ProfileData';
import PostsTabs from '../../components/Profile/PostsTabs';

export default function Profile({ uid, token }) {
  const { user } = useAuth();
  const router = useRouter();
  const { data: ownPosts } = useGetUserPostsQuery({ uid, token });
  const { data: savedPost } = useGetUserSavedPostsQuery({ uid, token });

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
              {savedPost?.savedPosts.length || 0}
            </strong>
            Publicações Guardadas
          </span>
        </div>
      </ProfileData>
      <PostsTabs ownPosts={ownPosts} savedPosts={savedPost} />
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, res }) => {
      const { uid, token } = query;
      if (!uid || !token) {
        res.writeHead(302, {
          Location: '/',
        });
        res.end();
        return { props: {} };
      }
      store.dispatch(
        getUserPosts.initiate({ uid, token }),
        getUserSavedPosts.initiate({ uid, token }),
      );
      await Promise.all(getRunningOperationPromises());
      return {
        props: { uid, token },
      };
    },
);
