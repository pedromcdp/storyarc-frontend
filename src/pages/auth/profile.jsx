import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import useAuth from '../../hooks/auth';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import { wrapper } from '../../app/store';
import {
  getUserPosts,
  getUserSavedPosts,
  getRunningOperationPromises,
  //   useGetUserPostsQuery,
  //   useGetUserSavedPostsQuery,
} from '../../services/storyarc';

export default function Profile({ uid, token }) {
  const { user } = useAuth();
  const router = useRouter();
  //   const { data: ownPosts } = useGetUserPostsQuery(user.uid, token);
  //   const { data: savedPost } = useGetUserSavedPostsQuery(user.uid, token);

  if (!user) {
    router.replace('/404');
    return null;
  }

  return (
    <MainLayout title={`storyarc | ${user.displayName}`}>
      <ProfileHeader />
      <h1>{user.displayName}</h1>
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
        getUserPosts.initiate(uid, token),
        getUserSavedPosts.initiate(uid, token),
      );
      await Promise.all(getRunningOperationPromises());
      return {
        props: { uid, token },
      };
    },
);
