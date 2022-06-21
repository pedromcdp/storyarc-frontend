import Head from 'next/head';
import Image from 'next/image';
import SignUp from '../../components/SignUp';

export default function signup() {
  return (
    <div className="overflow-hidden h-screen font-body antialiased bg-red-100">
      <Head>
        <title>storyarc | login</title>
      </Head>
      <main className="flex overflow-auto">
        <SignUp />
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
