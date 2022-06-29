/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/auth';
import GoogleLoginButton from './GoogleLoginButton';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const { loginWithEmail, error } = useAuth();

  useEffect(() => {
    console.log(error);
    switch (error) {
      case 'auth/user-not-found':
        setError('email', {
          type: 'manual',
          message: 'Não foi possível encontral o utilizador',
        });
        break;
      case 'auth/wrong-password':
        setError('password', {
          type: 'manual',
          message: 'Password incorreta',
        });
        break;
      case 'auth/invalid-email':
        setError('email', {
          type: 'manual',
          message: 'Email inválido',
        });
        break;
      case 'auth/too-many-requests':
        setError('email', {
          type: 'manual',
          message: 'Conta desativada por tentativas excessivas',
        });
        break;
      default:
        break;
    }
  }, [error]);

  const onSubmit = (data) => {
    const { email, password } = data;
    loginWithEmail(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 w-full min-w-[22rem] sm:w-[25rem]"
    >
      <GoogleLoginButton />
      <div className="flex before:flex-1 after:flex-1 items-center my-4 before:mt-0.5 after:mt-0.5 before:border-t after:border-t before:border-gray-300 after:border-gray-300 select-none">
        <p className="mx-4 mb-0">Ou</p>
      </div>
      <input
        {...register('email', {
          required: {
            value: true,
            message: 'É necessário introduzir um email',
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'É necessário introduzir um email válido',
          },
        })}
        type="email"
        className="formInput"
        placeholder="Email"
      />
      {errors.email && (
        <p className="text-xs text-red-500">{errors.email.message}</p>
      )}

      <input
        {...register('password', {
          required: {
            value: true,
            message: 'É necessário introduzir a sua password',
          },
        })}
        type="password"
        className="formInput"
        placeholder="Senha"
      />
      {errors.password && (
        <p className="text-xs text-red-500">{errors.password.message}</p>
      )}
      <div className="mt-4 text-center">
        <button
          type="submit"
          aria-label="Botão para iniciar sessão"
          className="submitBtn"
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
