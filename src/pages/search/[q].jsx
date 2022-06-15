import MainLayout from '../../layouts/MainLayout';
import FeedFilter from '../../components/FeedFilter';
import PostsContainer from '../../components/Feed/PostsContainer';
import Loading from '../../components/Loading';
import { wrapper } from '../../app/store';
import {
  getSearch,
  useGetSearchQuery,
  getRunningOperationPromises,
} from '../../services/storyarc';

export default function PostPage({ searchTerm }) {
  const { data, isFetching, isLoading } = useGetSearchQuery(searchTerm);
  return (
    <MainLayout title="storyarc">
      <FeedFilter />
      {isFetching || (isLoading && <Loading size="xs" />)}
      {data ? <PostsContainer data={data.data} /> : <Loading size="xs" />}
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const q = context.params?.q;
    store.dispatch(getSearch.initiate(q));
    await Promise.all(getRunningOperationPromises());
    return {
      props: {
        searchTerm: q,
      },
    };
  },
);
