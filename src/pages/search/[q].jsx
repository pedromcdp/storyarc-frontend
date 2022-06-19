import { QueryClient, dehydrate } from 'react-query';
import MainLayout from '../../layouts/MainLayout';
import ShowSearchTerm from '../../components/Search/ShowSearchTerm';
import PostsContainer from '../../components/Feed/PostsContainer';
import Loading from '../../components/Loading';
import NoPosts from '../../components/Profile/NoPosts';
import { useGetSearch } from '../../hooks/useAPI';
import { fetchSearch } from '../../utils/apiCalls';

export default function PostPage({ q }) {
  const { data, isLoading, hasNextPage, fetchNextPage } = useGetSearch(q);

  return (
    <MainLayout title="storyarc">
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
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { q } = context.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(['search', q], () =>
    fetchSearch(0, q),
  );
  return {
    props: {
      q,
      preloadedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
