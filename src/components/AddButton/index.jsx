import { PlusCircleIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { openDialog } from '../../features/dialog/dialogSlice';
import { auth } from '../../firebase/firebase';

export default function AddButton() {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!auth.currentUser) {
      dispatch(openDialog());
    } else {
      console.log('User logged in');
    }
  };

  return (
    <button
      type="button"
      aria-label="Criar uma publicação"
      className="flex p-5 space-x-1 w-full bg-white rounded-xl border hover:border hover:border-verde shadow-sm"
      onClick={handleClick}
    >
      <PlusCircleIcon className="w-6 h-6 text-verde" />
      <span className="">Criar uma publicação</span>
    </button>
  );
}
