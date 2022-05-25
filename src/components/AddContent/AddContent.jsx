/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import { useClickOutside } from '@mantine/hooks';
import { useDispatch } from 'react-redux';
import { setAddContent } from '../../features/addContent/addContentSlice';
import PhotoDropzone from './PhotoDropzone';

export default function AddContent() {
  const dispatch = useDispatch();

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      dispatch(setAddContent(false));
    }
  }

  const clickedOutside = useClickOutside(
    () => dispatch(setAddContent(false)),
    ['mouseup', 'touchend'],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <>
      <div
        id="defaultModal"
        aria-hidden="true"
        className="flex overflow-x-hidden overflow-y-auto fixed inset-x-0 top-4 z-50 justify-center items-center md:inset-0 md:h-full h-modal"
      >
        <div
          ref={clickedOutside}
          className="relative px-4 w-full max-w-2xl h-full md:h-auto"
        >
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex justify-between items-start p-5 rounded-t border-b">
              <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                Adicionar conteúdo
              </h3>
              <button
                onClick={() => dispatch(setAddContent(false))}
                type="button"
                className="inline-flex items-center p-1.5 ml-auto text-sm text-gray-400 hover:text-gray-900 bg-transparent hover:bg-gray-200 rounded-lg"
                data-modal-toggle="defaultModal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <form className="p-6 space-y-6">
              <input
                className="py-2 px-3 pb-12 w-full font-light tracking-wide leading-tight text-gray-700 rounded border focus:outline-none shadow appearance-none focus:shadow-outline"
                type="text"
                placeholder="Adiciona uma descrição"
              ></input>
              <input
                className="py-2 px-3 w-full font-light tracking-wide leading-tight text-gray-700 rounded border focus:outline-none shadow appearance-none focus:shadow-outline"
                type="text"
                placeholder="Introduz a localização da fotografia"
              ></input>
              <input
                className="py-2 px-3 w-full font-light tracking-wide leading-tight text-gray-700 rounded border focus:outline-none shadow appearance-none focus:shadow-outline"
                type="date"
                placeholder="Seleciona uma data"
              ></input>
              <PhotoDropzone />
            </form>

            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
              <button
                type="button"
                className="py-2.5 px-5 text-sm font-medium text-center text-white bg-verde rounded-lg focus:ring-4 focus:ring-blue-300"
              >
                Adicionar
              </button>
              <button
                onClick={() => dispatch(setAddContent(false))}
                type="button"
                className="focus:z-10 py-2.5 px-5 text-sm font-medium text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 focus:ring-4 focus:ring-gray-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"></div>
    </>
  );
}
