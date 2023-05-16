import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Login from '../../components/Login';
import useAuth from '../../hooks/auth';

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();

  if (auth.user) {
    router.replace('/');
    return null;
  }

  return (
    <div className="h-screen overflow-hidden bg-red-100 antialiased">
      <Head>
        <title>storyarc | login</title>
      </Head>
      <main className="flex overflow-auto">
        <Login />
        <div className="relative flex grow bg-white">
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
