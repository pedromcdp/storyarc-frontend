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
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-sm rounded-xl bg-white p-4">
              <Dialog.Title className="flex items-center gap-2 font-medium">
                <ShieldExclamationIcon className="squircleMask h-[1.8rem] w-[1.8rem] bg-verde p-1 text-white" />
                Sem sessão iniciada
              </Dialog.Title>
              <Dialog.Description className="my-4">
                Para criar uma publicação, é necessário iniciar uma sessão.
              </Dialog.Description>
              <button
                className="ease mr-3 rounded-lg border px-3 py-[0.5rem] transition-all hover:scale-105 focus:scale-105"
                onClick={() => {
                  router.push('/auth/signin');
                  dispatch(closeDialog());
                }}
              >
                Iniciar sessão
              </button>
              <button
                className="ease rounded-lg bg-verde px-3 py-[0.5rem] font-medium text-white transition-all hover:scale-105 focus:scale-105"
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
