import { QueryClient, dehydrate } from 'react-query';
import { motion } from 'framer-motion';
import MainLayout from '../../layouts/MainLayout';
import ShowSearchTerm from '../../components/Search/ShowSearchTerm';
import PostsContainer from '../../components/Feed/PostsContainer';
import Loading from '../../components/Loading';
import NoPosts from '../../components/Profile/NoPosts';
import { useGetSearch } from '../../hooks/useQuery';
import { fetchSearch } from '../../utils/apiCalls';

export default function PostPage({ q }) {
  const { data, isLoading, hasNextPage, fetchNextPage } = useGetSearch(q);

  return (
    <MainLayout title="storyarc">
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
        <ShowSearchTerm term={q} />
        {isLoading && <Loading size="xs" />}
        {data?.pages[0].results === 0 && <NoPosts text="Sem Publicações" />}
        {data?.pages[0].results > 0 && (
          <PostsContainer
            data={data}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
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
  const { q } = context.query;
  const queryClient = new QueryClient();
  queryClient.prefetchInfiniteQuery(['search', q], () => fetchSearch(0, q));
  return {
    props: {
      q,
      preloadedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
