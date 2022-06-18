/* eslint-disable no-nested-ternary */
import { QueryClient, dehydrate } from 'react-query';
import { useSelector } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import PostsContainer from '../components/Feed/PostsContainer';
import Loading from '../components/Loading';
import FeedFilter from '../components/FeedFilter';
import { useFeedFilter } from '../features/feedFilter/feedFilterSlice';
import { useGetLatest, useGetTrending } from '../hooks/useLatest';
import { fetchLatest } from '../utils/apiCalls';

export default function Home() {
  const { data, hasNextPage, fetchNextPage } = useGetLatest();
  const {
    data: trendingData,
    hasNextPage: trendingHasNextPage,
    fetchNextPage: trendingFetchNextPage,
  } = useGetTrending();

  return (
    <MainLayout title="storyarc">
      {JSON.parse(useSelector(useFeedFilter)).value === 'latest' ? (
        data ? (
          <PostsContainer
            data={data}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          >
            <FeedFilter />
          </PostsContainer>
        ) : (
          <Loading size="xs" />
        )
      ) : data ? (
        <PostsContainer
          data={trendingData}
          hasNextPage={trendingHasNextPage}
          fetchNextPage={trendingFetchNextPage}
        >
          <FeedFilter />
        </PostsContainer>
      ) : (
        <Loading size="xs" />
      )}
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery('latest', () => fetchLatest(0));
  return {
    props: {
      preloadedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
