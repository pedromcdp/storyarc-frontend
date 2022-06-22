import { QueryClient, dehydrate } from 'react-query';
import { useSelector } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import PostsContainer from '../components/Feed/PostsContainer';
import Loading from '../components/Loading';
import FeedFilter from '../components/FeedFilter';
import { useFeedFilter } from '../features/feedFilter/feedFilterSlice';
import { useGetLatest, useGetTrending } from '../hooks/useAPI';
import { fetchLatest } from '../utils/apiCalls';

export default function Home() {
  const { data, isFetching, hasNextPage, fetchNextPage } = useGetLatest();
  const {
    data: trendingData,
    isFetching: trendingIsFetching,
    hasNextPage: trendingHasNextPage,
    fetchNextPage: trendingFetchNextPage,
  } = useGetTrending();

  return (
    <MainLayout title="storyarc">
      <FeedFilter />
      {isFetching || (trendingIsFetching && <Loading size="xs" />)}
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
  await queryClient.prefetchInfiniteQuery('latest', () => fetchLatest(0));
  return {
    props: {
      preloadedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
