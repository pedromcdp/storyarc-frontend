import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import { wrapper } from '../app/store';
import { getAllPost, getRunningOperationPromises } from '../services/storyarc';

export default function Home() {
  return (
    <div className="overflow-hidden h-screen font-body antialiased bg-gray-100">
      <Head>
        <title>storyarc</title>
      </Head>
      <Header />
      <main className="flex">
        <Sidebar />
        <Feed />
      </main>
    </div>
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
