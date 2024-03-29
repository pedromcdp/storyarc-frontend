import { PlusCircleIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { openDialog } from '../../features/dialog/dialogSlice';
import { openAddContent } from '../../features/addContent/addContentSlice';
import useAuth from '../../hooks/auth';

export default function AddButton() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleClick = () => {
    if (!user) {
      dispatch(openDialog());
    } else {
      dispatch(openAddContent());
    }
  };

  return (
    <button
      type="button"
      aria-label="Criar uma publicação"
      className="flex p-5 space-x-1 w-full bg-white rounded-xl border hover:border hover:border-verde focus:outline-verde shadow-sm"
      onClick={handleClick}
    >
      <PlusCircleIcon className="w-6 h-6 text-verde" />
      <span className="">Criar uma publicação</span>
    </button>
  );
}
