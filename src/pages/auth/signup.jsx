import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/auth';
import BackButton from '../../components/Buttons/BackButton';
import SignUp from '../../components/SignUp';

export default function SignUpPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (user) {
    router.replace('/');
    return null;
  }
  return (
    <div className="overflow-auto antialiased">
      <Head>
        <title>storyarc | sign up</title>
      </Head>
      <main className="flex overflow-auto min-h-screen">
        <BackButton />
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
