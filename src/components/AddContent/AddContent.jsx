import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  useAddContent,
  closeAddContent,
  showLoading,
  hideLoading,
} from '../../features/addContent/addContentSlice';
import PhotoDropzone from './PhotoDropzone';
import { UploadService } from '../../services/uploadService';
import useAuth from '../../hooks/auth';
import { useCreatePost } from '../../hooks/useMutation';

export default function AddContent() {
  const { user } = useAuth();
  const isOpen = useSelector(useAddContent);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const { mutateAsync: createPost } = useCreatePost();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { description, location, date } = data;
    if (files.length) {
      setDisabled(true);
      dispatch(showLoading());
      const promises = files.map((file) => UploadService.uploadFile(file));
      Promise.all(promises)
        .then((photoUrls) => {
          createPost({
            user: user.uid,
            postType: photoUrls.length > 1 ? 'comparacao' : 'foto',
            description,
            photo: photoUrls[0],
            newPhoto: photoUrls.length > 1 ? photoUrls[1] : null,
            streetName: location,
            contentDate: date,
          })
            .then(() => {
              setDisabled(false);
              setFiles([]);
              dispatch(closeAddContent());
              dispatch(hideLoading());
              document.getElementById('scrollparent').scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            })
            .catch(() => {
              setDisabled(false);
              dispatch(hideLoading());
              setError('network', {
                type: 'manual',
                message:
                  'Não foi possível submeter a publicação, tente novamente',
              });
            });
        })
        .catch(() => {
          setDisabled(false);
          dispatch(hideLoading());
          setError('network', {
            type: 'manual',
            message: 'Não foi possível submeter a publicação, tente novamente',
          });
        });
    } else {
      setError('images', {
        type: 'manual',
        message: 'Por favor, selecione pelo menos uma imagem',
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
              {errors.network && (
                <p className="text-xs text-red-500">{errors.network.message}</p>
              )}
              <form className="p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    {...register('description', {
                      required: {
                        value: true,
                        message: 'É necessário preencher o campo descrição',
                      },
                      minLength: {
                        value: 10,
                        message: 'A descrição deve ter no mínimo 10 caracteres',
                      },
                    })}
                    disabled={disabled}
                    className="addContentDescInput"
                    placeholder="Adiciona uma descrição"
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register('location', {
                      required: {
                        value: true,
                        message: 'É necessário preencher o campo localização',
                      },
                    })}
                    disabled={disabled}
                    className="addContentInput"
                    type="text"
                    placeholder="Introduz a localização da fotografia"
                  />
                  {errors.location && (
                    <p className="text-xs text-red-500">
                      {errors.location.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register('date', {
                      required: {
                        value: true,
                        message: 'É necessário preencher o campo data',
                      },
                    })}
                    disabled={disabled}
                    className="addContentInput"
                    type="date"
                    placeholder="Seleciona uma data"
                  />
                  {errors.date && (
                    <p className="text-xs text-red-500">
                      {errors.date.message}
                    </p>
                  )}
                </div>
                <PhotoDropzone
                  files={files}
                  setFiles={setFiles}
                  disabled={disabled}
                />
                {errors.images && (
                  <p className="text-xs text-red-500">
                    {errors.images.message}
                  </p>
                )}
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
