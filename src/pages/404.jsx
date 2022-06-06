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
      <div className="flex flex-col items-center pt-10 space-y-10">
        <p className="text-2xl text-verde">Pareces estar perdido na história</p>
        <div className="flex flex-1 items-center">
          <div className="relative w-64 h-64">
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
            className="py-2 px-4 mx-2 text-white hover:text-verde bg-verde hover:bg-white rounded-md border hover:border border-transparent hover:border-verde shadow-md transition-all duration-100 ease-in cursor-pointer"
          >
            aqui
          </button>
          para voltares ao presente
        </p>
      </div>
    </MainLayout>
  );
}
