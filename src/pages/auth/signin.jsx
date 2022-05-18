import Head from 'next/head';
import Image from 'next/image';
import Login from '../../components/Login';

export default function LoginPage() {
  return (
    <div className="overflow-hidden h-screen font-body antialiased bg-red-100">
      <Head>
        <title>storyarc | login</title>
      </Head>
      <main className="flex overflow-auto">
        <Login />
        <div className="flex relative grow bg-white">
          <Image
            src="/images/banner.webp"
            typeof="image/webp"
            alt="imagem banner do storyarc"
            layout="fill"
            className="object-cover"
            priority
          />
        </div>
      </main>
    </div>
  );
}
