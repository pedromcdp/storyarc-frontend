import MainLayout from '../../layouts/MainLayout';
import FeedFilter from '../../components/FeedFilter';
import PostsContainer from '../../components/Feed/PostsContainer';
import Loading from '../../components/Loading';
import { wrapper } from '../../app/store';
import {
  getPostWithUserAndCommentsData,
  getRunningOperationPromises,
  useGetPostWithUserAndCommentsDataQuery,
} from '../../services/storyarc';

export default function PostPage({ postId }) {
  const { data } = useGetPostWithUserAndCommentsDataQuery(postId);
  return (
    <MainLayout title="storyarc">
      <FeedFilter />
      {data ? <PostsContainer data={data} /> : <Loading size="xs" />}
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;
    store.dispatch(getPostWithUserAndCommentsData.initiate(id));
    await Promise.all(getRunningOperationPromises());
    return {
      props: {
        postId: id,
      },
    };
  },
);
