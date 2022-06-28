/* eslint-disable no-alert */
import { Fragment, useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  useAddContent,
  closeAddContent,
  showLoading,
  hideLoading,
} from '../../features/addContent/addContentSlice';
import PhotoDropzone from './PhotoDropzone';
import { UploadService } from '../../services/uploadService';
import { useUploadPostMutation } from '../../services/storyarc';
import useAuth from '../../hooks/auth';
import { useGetLatest } from '../../hooks/useAPI';

export default function AddContent() {
  const { user } = useAuth();
  const isOpen = useSelector(useAddContent);
  const dispatch = useDispatch();
  const descRef = useRef(null);
  const locationRef = useRef(null);
  const dateRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [uploadPost] = useUploadPostMutation();
  const { refetch } = useGetLatest();
  const inputs = [descRef, locationRef, dateRef];
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    inputs.map((input) => {
      if (input.current.value === '' || files.length === 0) {
        alert('É necessário preencher todos os campos');
      }
      return true;
    });
    if (inputs.every((input) => input.current.value !== '')) {
      setDisabled(true);
      dispatch(showLoading());
      const promises = files.map((file) => UploadService.uploadFile(file));
      Promise.all(promises)
        .then(async (photoUrls) => {
          uploadPost({
            user: user.uid,
            postType: photoUrls.length > 1 ? 'comparacao' : 'foto',
            description: descRef.current.value,
            photo: photoUrls[0],
            newPhoto: photoUrls.length > 1 ? photoUrls[1] : null,
            streetName: locationRef.current.value,
            contentDate: dateRef.current.value,
          })
            .then(() => {
              refetch();
              setDisabled(false);
              setFiles([]);
              dispatch(closeAddContent());
              dispatch(hideLoading());
              router.push('/');
              document.getElementById('scrollparent').scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            })
            .catch((err) => {
              setDisabled(false);
              alert(err.message);
            });
        })
        .catch((err) => {
          setDisabled(false);
          console.log(err);
        });
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => !disabled && dispatch(closeAddContent())}
        className="relative z-40"
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
        <div className="flex overflow-y-auto fixed inset-0 justify-center items-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="p-4 mx-auto w-full max-w-2xl bg-white rounded-xl">
              <Dialog.Title className="flex justify-between items-center mx-4 font-medium">
                <p className="text-xl lg:text-xl">Adicionar conteúdo</p>
                <button
                  disabled={disabled}
                  className="p-1.5 text-gray-500 hover:text-black focus:text-black bg-transparent hover:bg-gray-100 focus:bg-gray-100 disabled:bg-gray-100 rounded-lg outline-verde disabled:cursor-not-allowed"
                  onClick={() => !disabled && dispatch(closeAddContent())}
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </Dialog.Title>
              <form className="p-4 space-y-5" onSubmit={handleSubmit}>
                <input
                  ref={descRef}
                  disabled={disabled}
                  className="py-2 px-3 pb-12 w-full font-light tracking-wide leading-tight text-gray-700 rounded-md border focus:border-verde focus:outline-none shadow appearance-none focus:shadow-outline"
                  type="text"
                  placeholder="Adiciona uma descrição"
                />
                <input
                  ref={locationRef}
                  disabled={disabled}
                  className="py-2 px-3 w-full font-light tracking-wide leading-tight text-gray-700 rounded border focus:border-verde focus:outline-none shadow appearance-none focus:shadow-outline"
                  type="text"
                  placeholder="Introduz a localização da fotografia"
                />
                <input
                  ref={dateRef}
                  disabled={disabled}
                  className="py-2 px-3 w-full font-light tracking-wide leading-tight text-gray-700 rounded border focus:border-verde focus:outline-none shadow appearance-none min-h-10 focus:shadow-outline"
                  type="date"
                  placeholder="Seleciona uma data"
                />
                <PhotoDropzone
                  files={files}
                  setFiles={setFiles}
                  disabled={disabled}
                />
                <div className="flex items-center pt-4 space-x-2 rounded-b border-t border-gray-200">
                  <button
                    disabled={disabled}
                    type="submit"
                    className="py-2.5 px-5 text-sm font-medium text-center text-white bg-verde disabled:bg-gray-100 rounded-lg disabled:cursor-not-allowed"
                  >
                    Criar Publicação
                  </button>
                  <button
                    disabled={disabled}
                    onClick={() => dispatch(closeAddContent())}
                    type="button"
                    className="py-2.5 px-5 text-sm font-medium bg-white hover:bg-gray-100 disabled:bg-gray-100 rounded-lg border  border-gray-200 focus:outline-verde disabled:cursor-not-allowed"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
