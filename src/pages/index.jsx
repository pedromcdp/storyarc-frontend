import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';

export default function Home() {
  return (
    <div className="overflow-hidden h-screen font-body bg-gray-100">
      <Head>
        <title>storyarc</title>
      </Head>
      <main className="flex">
        <Sidebar />
        <Feed />
      </main>
    </div>
  );
}
