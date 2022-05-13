import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ShieldExclamationIcon } from '@heroicons/react/outline';
import { useDialog, closeDialog } from '../../features/dialog/dialogSlice';

export function AppDialog() {
  const isOpen = useSelector(useDialog);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => dispatch(closeDialog())}
        className="relative z-50"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <div className="flex fixed inset-0 justify-center items-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="p-4 mx-auto max-w-sm bg-white rounded-xl">
              <Dialog.Title className="flex items-center font-medium">
                <ShieldExclamationIcon className="p-1 mr-1 w-[1.8rem] h-[1.8rem] text-white bg-verde mask mask-squircle" />
                Sem sessão iniciada
              </Dialog.Title>
              <Dialog.Description className="my-2">
                Para criar uma publicação, é necessário iniciar uma sessão.
              </Dialog.Description>
              <button
                className="py-[0.5rem] px-3 mr-2 rounded-lg border transition-all ease hover:scale-105 focus:scale-105"
                onClick={() => {
                  router.push('/login');
                  dispatch(closeDialog());
                }}
              >
                Iniciar sessão
              </button>
              <button
                className="py-[0.5rem] px-3 font-medium text-white bg-verde rounded-lg transition-all ease hover:scale-105 focus:scale-105"
                onClick={() => dispatch(closeDialog())}
              >
                Fechar
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
