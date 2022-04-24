import Head from 'next/head';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div className="h-screen bg-gray-100 overflow-hidden font-body">
      <Head>
        <title>storyarc</title>
      </Head>
      <main className="flex">
        <Sidebar />
        <div className="mx-auto">
          <h1 className=" text-2xl font-light">Hello World</h1>
        </div>
      </main>
    </div>
  );
}
