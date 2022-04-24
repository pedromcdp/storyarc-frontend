import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';

export default function Home() {
  return (
    <div className="h-screen bg-gray-100 overflow-hidden font-body">
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
