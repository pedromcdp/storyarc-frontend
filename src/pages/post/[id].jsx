import { dehydrate, QueryClient } from 'react-query';
import MainLayout from '../../layouts/MainLayout';
// import FeedFilter from '../../components/FeedFilter';
import Loading from '../../components/Loading';
import { fetchPost } from '../../utils/apiCalls';
import { useGetPost } from '../../hooks/useLatest';
import Post from '../../components/Post';

export default function PostPage({ postId }) {
  // const { data } = useGetPostWithUserAndCommentsDataQuery(postId);
  const { data: post, isFetching } = useGetPost(postId);

  return (
    <MainLayout title="storyarc">
      {/* <FeedFilter /> */}
      {isFetching && <Loading size="xs" />}
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
