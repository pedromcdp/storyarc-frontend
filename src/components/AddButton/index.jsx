import { PlusCircleIcon } from '@heroicons/react/solid';

export default function AddButton() {
  return (
    <button
      type="button"
      role="button"
      aria-label="Criar uma publicação"
      className="flex p-5 space-x-1 w-full bg-white hover:bg-gray-100 rounded-xl shadow-sm"
    >
      <PlusCircleIcon className="w-6 h-6 text-verde" />
      <span className="">Criar uma publicação</span>
    </button>
  );
}
