/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import useAuth from '../../hooks/auth';
import { UploadService } from '../../services/uploadService';
import GoogleLoginButton from '../Login/GoogleLoginButton';
import LoginInput from '../Login/LoginInput';

export default function SignUpForm() {
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');
  const [image, setImage] = useState(null);

  const { createUserWithEmailAndPassword } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    UploadService.uploadUserImage(image)
      .then((url) => {
        createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value,
          nameRef.current.value,
          url,
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 w-full min-w-[22rem] sm:w-[25rem]"
    >
      <div className="flex flex-col gap-2 items-center mb-6">
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={(e) => {
            setImage(
              Object.assign(e, {
                preview: URL.createObjectURL(e.target.files[0]),
              }),
            );
          }}
        />
        <label htmlFor="file" className="relative w-20 h20">
          <Image
            src={image ? image.preview : '/images/avatar.webp'}
            alt="profile icon"
            className="rounded-full cursor-pointer"
            layout="responsive"
            width={70}
            height={70}
          />
        </label>
        <label
          htmlFor="file"
          className="text-verde hover:underline cursor-pointer"
        >
          Selecionar fotografia
        </label>
      </div>
      <LoginInput
        refProp={emailRef}
        placeholder="Nome"
        id="nameInput"
        type="text"
      />
      <LoginInput
        refProp={emailRef}
        placeholder="Email"
        id="emailInput"
        type="email"
      />
      <LoginInput
        refProp={passwordRef}
        placeholder="Password"
        id="passwordInput"
        type="password"
      />
      <LoginInput
        refProp={confirmPasswordRef}
        placeholder="Confirma a password"
        id="passwordInput"
        type="password"
      />
      <div className="text-center">
        <button
          type="submit"
          aria-label="Botão para iniciar sessão"
          className="py-3 px-7 w-full text-white hover:text-verde focus:text-verde bg-verde hover:bg-white focus:bg-white rounded-lg border border-verde focus:outline-verde shadow-md transition-all duration-100 ease-in-out"
        >
          Criar Conta
        </button>
        <p className="mt-4">
          Já tens conta ?
          <Link href="/auth/signin" passHref>
            <a className="ml-1 text-verde">Inicia sessão</a>
          </Link>
        </p>
      </div>
      <div className="flex before:flex-1 after:flex-1 items-center my-4 before:mt-0.5 after:mt-0.5 before:border-t after:border-t before:border-gray-300 after:border-gray-300 select-none">
        <p className="mx-4 mb-0">Ou</p>
      </div>
      <GoogleLoginButton />
    </form>
  );
}
