import Link from 'next/link';
import { useRef } from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import LoginInput from './LoginInput';

export default function LoginForm() {
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(emailRef.current.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 w-full min-w-[22rem] sm:w-[25rem]"
    >
      <GoogleLoginButton />
      <div className="flex before:flex-1 after:flex-1 items-center my-4 before:mt-0.5 after:mt-0.5 before:border-t after:border-t before:border-gray-300 after:border-gray-300 select-none">
        <p className="mx-4 mb-0">Ou</p>
      </div>
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
      <div className="text-center">
        <button
          type="submit"
          aria-label="Botão para iniciar sessão"
          className="py-3 px-7 w-full text-white hover:text-verde focus:text-verde bg-verde hover:bg-white focus:bg-white rounded-lg border border-verde focus:outline-verde shadow-md transition-all duration-100 ease-in-out"
        >
          Iniciar Sessão
        </button>
        <p className="mt-4">
          Não tens conta ?
          <Link href="/auth/signup" passHref>
            <a className="ml-1 text-verde">Criar conta</a>
          </Link>
        </p>
      </div>
    </form>
  );
}
