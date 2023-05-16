import Image from 'next/image';
import { useRouter } from 'next/router';
import MainLayout from '../layouts/MainLayout';

export default function Page404() {
  const router = useRouter();
  function handleClick() {
    router.push('/');
  }

  return (
    <MainLayout title="storyarc | 404">
      <div className="flex flex-col items-center space-y-10 pt-10">
        <p className="text-2xl text-verde">Pareces estar perdido na história</p>
        <div className="flex flex-1 items-center">
          <div className="relative h-64 w-64">
            <Image
              src="/images/hourglass.webp"
              typeof="image/webp"
              alt="ampulheta"
              layout="fill"
              priority
            />
          </div>
        </div>
        <p className="text-lg text-gray-500">
          Clica
          <button
            onClick={handleClick}
            className="mx-2 cursor-pointer rounded-md border border-transparent bg-verde px-4 py-2 text-white shadow-md transition-all duration-100 ease-in hover:border hover:border-verde hover:bg-white hover:text-verde"
          >
            aqui
          </button>
          para voltares ao presente
        </p>
      </div>
    </MainLayout>
  );
}
