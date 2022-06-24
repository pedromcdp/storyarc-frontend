import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

export default function BackButton() {
  const router = useRouter();

  return (
    <button className="fixed top-4 left-4" onClick={() => router.back()}>
      <ArrowLeftIcon className="w-7 h-7" />
    </button>
  );
}
