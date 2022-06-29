import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/auth';
import { UploadService } from '../../services/uploadService';
import GoogleLoginButton from '../Login/GoogleLoginButton';
import { defaultAvatarUrl } from '../../utils/appUrls';
import Notification from '../Notification';

export default function SignUpForm() {
  const [image, setImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const { createUserWithEmailAndPassword } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    setIsDisabled(true);
    setShow(true);
    if (image) {
      UploadService.uploadUserImage(image)
        .then((url) => {
          createUserWithEmailAndPassword(email, password, name, url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await createUserWithEmailAndPassword(
        email,
        password,
        name,
        defaultAvatarUrl,
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 w-full min-w-[22rem] sm:w-[25rem]"
    >
      <div className="flex flex-col gap-2 items-center mb-6">
        <input
          type="file"
          id="file"
          className="hidden"
          disabled={isDisabled}
          onChange={(e) => {
            setImage(
              Object.assign(e.target.files[0], {
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
      <input
        {...register('name', {
          required: {
            value: true,
            message: 'É necessário preencher o nome',
          },
          minLength: {
            value: 2,
            message: 'O nome deve ter no mínimo 3 caracteres',
          },
          maxLength: {
            value: 20,
            message: 'O nome deve ter no máximo 20 caracteres',
          },
        })}
        className="formInput"
        placeholder="Nome"
        type="text"
        disabled={isDisabled}
      />
      {errors.name && (
        <p className="text-xs text-red-500">{errors.name.message}</p>
      )}
      <input
        {...register('email', {
          required: {
            value: true,
            message: 'É necessário preencher o email',
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Email inválido',
          },
        })}
        className="formInput"
        placeholder="Email"
        type="email"
        disabled={isDisabled}
      />
      {errors.email && (
        <p className="text-xs text-red-500">{errors.email.message}</p>
      )}
      <input
        {...register('password', {
          required: {
            value: true,
            message: 'É necessário preencher a senha',
          },
          pattern: {
            value: /^(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/,
            message:
              'A senha requer pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um carácter especial',
          },
        })}
        className="formInput"
        placeholder="Senha"
        type="password"
        disabled={isDisabled}
      />
      {errors.password && (
        <p className="text-xs text-red-500">{errors.password.message}</p>
      )}
      <input
        {...register('confirmPassword', {
          required: {
            value: true,
            message: 'É necessário confirmar a senha',
          },
          validate: (value) =>
            value === watch('password') || 'As senhas são diferentes',
        })}
        className="formInput"
        placeholder="Confirmar senha"
        type="password"
        disabled={isDisabled}
      />
      {errors.confirmPassword && (
        <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
      )}
      <div className="mt-4 text-center">
        <button
          type="submit"
          aria-label="Botão para iniciar sessão"
          className="submitBtn"
        >
          Criar Conta
        </button>
        <p className="mt-4">
          Já tens conta?
          <Link href="/auth/signin" passHref>
            <a className="ml-1 text-verde">Inicia sessão</a>
          </Link>
        </p>
      </div>
      <div className="flex before:flex-1 after:flex-1 items-center my-4 before:mt-0.5 after:mt-0.5 before:border-t after:border-t before:border-gray-300 after:border-gray-300 select-none">
        <p className="mx-4 mb-0">Ou</p>
      </div>
      <GoogleLoginButton />
      <Notification
        show={show}
        closeFn={() => setShow(false)}
        type="info"
        title="Conta a ser criada"
        subtitle="Por favor, aguarda enquanto a tua conta é criada"
      />
    </form>
  );
}
