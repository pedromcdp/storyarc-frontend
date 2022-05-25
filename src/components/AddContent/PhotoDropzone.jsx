/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useMemo, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { TrashIcon } from '@heroicons/react/solid';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const acceptStyle = {
  borderColor: '#37b780',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

export default function PhotoDropzone() {
  const [files, setFiles] = useState([]);

  const {
    getRootProps,
    getInputProps,

    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    maxFiles: 2,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    // files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragAccept, isDragReject],
  );

  const removeImage = (i) => {
    const temp = [...files];
    temp.splice(i, 1);
    setFiles(temp);
  };

  return (
    <section className="container">
      {files.length === 0 ? (
        <div
          {...getRootProps({ className: 'dropzone', style })}
          className="py-6 px-3 w-full font-light tracking-wide leading-tight text-gray-700 rounded border focus:outline-none shadow appearance-none focus:shadow-outline"
        >
          <svg
            className="m-auto w-28 h-28 rotate-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <p className="flex justify-center mb-6 text-sm select-none">
            Adiciona uma fotografia
          </p>
          <input
            {...getInputProps()}
            type="file"
            id="myfile"
            name="myfile"
            className="flex justify-center py-2.5 px-5 m-auto text-sm font-medium text-center text-white bg-verde rounded-lg focus:ring-4 focus:ring-blue-300"
          ></input>
        </div>
      ) : (
        <aside className="flex">
          {files.map((file, i) => (
            <div
              className="grow border border-verde"
              onClick={() => removeImage(i)}
              key={file.name}
              style={{
                height: '12.5rem',
                backgroundImage: `url(${file.preview})`,
                backgroundSize: '120%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="flex justify-center items-center w-full h-full bg-black bg-opacity-0 hover:bg-opacity-40 opacity-0 hover:opacity-100 transition duration-200 ease-out cursor-pointer">
                <TrashIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          ))}
        </aside>
      )}
    </section>
  );
}
