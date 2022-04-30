import Head from 'next/head';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Feed from '../../components/Feed';
import { wrapper } from '../../app/store';
import {
  getPostWithUserAndCommentsData,
  getRunningOperationPromises,
  useGetPostWithUserAndCommentsDataQuery,
} from '../../services/storyarc';

export default function PostPage({ postId }) {
  const { data } = useGetPostWithUserAndCommentsDataQuery(postId);
  return (
    <div className="overflow-hidden h-screen font-body antialiased bg-gray-100">
      <Head>
        <title>storyarc</title>
      </Head>
      <Header />
      <main className="flex">
        <Sidebar />
        <Feed data={data} />
      </main>
    </div>
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
