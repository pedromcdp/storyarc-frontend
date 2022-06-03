import MainLayout from '../layouts/MainLayout';
import FeedFilter from '../components/FeedFilter';
import PostsContainer from '../components/Feed/PostsContainer';
import { wrapper } from '../app/store';
import {
  getAllPost,
  useGetAllPostQuery,
  getRunningOperationPromises,
} from '../services/storyarc';

export default function Home() {
  const { data } = useGetAllPostQuery();
  return (
    <MainLayout title="storyarc">
      <FeedFilter />
      <PostsContainer data={data.data} />
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getAllPost.initiate());
    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  },
);
