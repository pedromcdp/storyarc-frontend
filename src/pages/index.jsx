import { QueryClient, dehydrate } from 'react-query';
import { useSelector } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import PostsContainer from '../components/Feed/PostsContainer';
import Loading from '../components/Loading';
import FeedFilter from '../components/FeedFilter';
import { useFeedFilter } from '../features/feedFilter/feedFilterSlice';
import { useGetRecent, useGetTrending } from '../hooks/useQuery';
import { fetchLatest } from '../utils/apiCalls';

export default function Home() {
  const { data, isLoading, isRefetching, hasNextPage, fetchNextPage } =
    useGetRecent();
  const {
    data: trendingData,
    isLoading: trendingIsLoading,
    hasNextPage: trendingHasNextPage,
    fetchNextPage: trendingFetchNextPage,
  } = useGetTrending();

  return (
    <MainLayout title="storyarc">
      <FeedFilter />
      {(isLoading || trendingIsLoading || isRefetching) && (
        <Loading size="xs" />
      )}
      {JSON.parse(useSelector(useFeedFilter)).value === 'latest' ? (
        <PostsContainer
          data={data}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      ) : (
        <PostsContainer
          data={trendingData}
          hasNextPage={trendingHasNextPage}
          fetchNextPage={trendingFetchNextPage}
        />
      )}
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { res } = context;
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  );
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery('recent', () => fetchLatest(0));
  return {
    props: {
      preloadedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
