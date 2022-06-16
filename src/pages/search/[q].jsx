import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import ShowSearchTerm from '../../components/Search/ShowSearchTerm';
import PostsContainer from '../../components/Feed/PostsContainer';
import Loading from '../../components/Loading';
import NoPosts from '../../components/Profile/NoPosts';
import { wrapper } from '../../app/store';
import {
  getSearch,
  useGetSearchQuery,
  getRunningOperationPromises,
} from '../../services/storyarc';

export default function PostPage() {
  const router = useRouter();
  const { q } = router.query;
  const { data, isFetching, isLoading } = useGetSearchQuery(q);
  return (
    <MainLayout title="storyarc">
      <ShowSearchTerm term={q} />
      {isFetching || (isLoading && <Loading size="xs" />)}
      {data?.results > 0 && <PostsContainer data={data.data} />}
      {data?.results === 0 && <NoPosts text="Sem Publicações" />}
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const q = context.params?.q;
    store.dispatch(getSearch.initiate(q));
    await Promise.all(getRunningOperationPromises());
    return {};
  },
);
