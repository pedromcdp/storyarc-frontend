import Head from 'next/head';
import Login from '../components/Login';

export default function LoginPage() {
  return (
    <div className="overflow-hidden h-screen font-body antialiased bg-red-100">
      <Head>
        <title>storyarc | login</title>
      </Head>
      <main className="flex overflow-auto">
        <Login />
      </main>
    </div>
  );
}
