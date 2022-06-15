import { useSelector } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import FeedFilter from '../components/FeedFilter';
import PostsContainer from '../components/Feed/PostsContainer';
import Loading from '../components/Loading';
import { wrapper } from '../app/store';
import { useFeedFilter } from '../features/feedFilter/feedFilterSlice';
import {
  getAllPost,
  useGetAllPostQuery,
  getRunningOperationPromises,
} from '../services/storyarc';

export default function Home() {
  const { data, isFetching, isLoading } = useGetAllPostQuery(
    JSON.parse(useSelector(useFeedFilter)).value,
  );

  return (
    <MainLayout title="storyarc">
      <FeedFilter />
      {isFetching || (isLoading && <Loading size="xs" />)}
      {data ? <PostsContainer data={data.data} /> : <Loading size="xs" />}
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getAllPost.initiate());
    await Promise.all(getRunningOperationPromises('latest'));

    return {
      props: {},
    };
  },
);
