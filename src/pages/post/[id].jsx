import { dehydrate, QueryClient } from 'react-query';
import MainLayout from '../../layouts/MainLayout';

import Loading from '../../components/Loading';
import { fetchPost } from '../../utils/apiCalls';
import { useGetPost } from '../../hooks/useAPI';
import Post from '../../components/Post';

export default function PostPage({ postId }) {
  const { data: post, isLoading } = useGetPost(postId);

  return (
    <MainLayout title="storyarc">
      {isLoading && <Loading size="xs" />}
      <div className="pb-10">
        <Post
          id={post._id}
          username={post.user.name}
          avatar={post.user.avatar}
          timestamp={post.createdAt}
          description={post.description}
          image={post.photo}
          newImage={post.newPhoto}
        />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { res } = context;
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  );
  const { id } = context.params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['posts', id], () => fetchPost(id));
  return {
    props: {
      postId: id,
      preloadedState: dehydrate(queryClient),
    },
  };
}
