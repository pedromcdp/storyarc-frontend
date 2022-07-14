import { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Datetime from 'react-datetime';
import moment from 'moment';
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
import 'react-datetime/css/react-datetime.css';
import { showNotification } from '../../features/notification/notificationSlice';

export default function AddContent() {
  const { user } = useAuth();
  const isOpen = useSelector(useAddContent);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { mutateAsync: createPost } = useCreatePost();
  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
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
              dispatch(
                showNotification({
                  type: 'success',
                  title: 'Publicação criada com sucesso',
                  subtitle:
                    'Agora é só aguardar que os outros utilzadores vejam a sua publicação!',
                }),
              );
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
                  <Controller
                    name="date"
                    control={control}
                    render={({ value, field }) => (
                      <Datetime
                        {...field}
                        dateFormat="YYYY"
                        initialViewMode="years"
                        inputProps={{
                          className: 'addContentInput',
                          disabled,
                          placeholder: 'Introduz a data da fotografia',
                        }}
                        onChange={(date) => {
                          if (typeof date === 'string') {
                            setValue('date', date);
                          } else {
                            setValue('date', date.year());
                          }
                        }}
                        value={value}
                        timeFormat={false}
                        closeOnSelect={true}
                        isValidDate={(current) =>
                          current.isBefore(moment()) &&
                          current.isAfter(moment('1822-01-01'))
                        }
                      />
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: 'É necessário preencher o campo data',
                      },
                      maxLength: {
                        value: 4,
                        message: 'O ano deve ter 4 dígitos',
                      },
                      minLength: {
                        value: 4,
                        message: 'O ano deve ter 4 dígitos',
                      },
                      pattern: {
                        value: /^[0-9]*$/,
                        message: 'O ano deve ter apenas dígitos',
                      },
                      min: {
                        value: 1822,
                        message: 'O ano deve ser maior ou igual a 1900',
                      },
                      max: {
                        value: moment().year(),
                        message: 'O ano deve ser menor ou igual ao ano atual',
                      },
                    }}
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
                  showPreview={showPreview}
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
                  {files.length === 2 && (
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      disabled={disabled}
                      onClick={() => setShowPreview(!showPreview)}
                      type="button"
                      className="py-2.5 px-5 text-sm font-medium bg-white hover:bg-gray-100 disabled:bg-gray-100 rounded-lg border  border-gray-200 focus:outline-verde disabled:cursor-not-allowed"
                    >
                      {showPreview ? 'Voltar' : 'Preview'}
                    </motion.button>
                  )}
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
