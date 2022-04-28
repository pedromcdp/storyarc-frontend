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
    <form onSubmit={handleSubmit} className="w-[25rem]">
      <GoogleLoginButton />
      <div className="flex before:flex-1 after:flex-1 items-center my-4 before:mt-0.5 after:mt-0.5 before:border-t after:border-t before:border-gray-300 after:border-gray-300 select-none">
        <p className="mx-4 mb-0">Ou</p>
      </div>
      <LoginInput
        refProp={emailRef}
        placeholder="Email"
        id="emailInput"
        type="text"
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
          role="button"
          aria-label="Botão para iniciar sessão"
          className="py-3 px-7 w-full text-white bg-verde rounded-lg shadow-md"
        >
          Iniciar Sessão
        </button>
        <p className="mt-4">
          Não tens conta ?
          <a href="#!" className="ml-1 text-verde">
            Criar conta
          </a>
        </p>
      </div>
    </form>
  );
}
