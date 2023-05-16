import { dehydrate, QueryClient } from 'react-query';
import { motion } from 'framer-motion';
import MainLayout from '../../layouts/MainLayout';
import Loading from '../../components/Loading';
import { fetchPost } from '../../utils/apiCalls';
import { useGetPost } from '../../hooks/useQuery';
import Post from '../../components/Post';

export default function PostPage({ postId }) {
  const { data: post, isLoading } = useGetPost(postId);

  return (
    <MainLayout title="storyarc">
      {isLoading && <Loading size="xs" />}
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
        className="pb-10"
      >
        <Post
          id={post._id}
          uid={post.user._id}
          username={post.user.name}
          avatar={post.user.avatar}
          timestamp={post.createdAt}
          description={post.description}
          image={post.photo}
          newImage={post.newPhoto}
          likes={post.likes}
          comments={post.comments}
        />
      </motion.div>
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
