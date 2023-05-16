import Image from 'next/image';
import useAuth from '../../hooks/auth';

export default function GoogleLoginButton() {
  const { loginWithGoogle } = useAuth();
  const handleLoginWithGoogle = (e) => {
    e.preventDefault();
    loginWithGoogle();
  };

  return (
    <button
      onClick={(e) => handleLoginWithGoogle(e)}
      aria-label="botão para iniciar sessão com o Google"
      className="flex w-full items-center justify-center gap-0.5 rounded-md border bg-white px-4 py-3 shadow-sm transition duration-100 ease-in-out hover:bg-gray-100"
    >
      <Image
        src="/images/glogo.webp"
        typeof="image/webp"
        alt="google logo"
        width="20rem"
        height="20rem"
        layout="fixed"
        priority
      />
      <span className="ml-2">Inicia sessão com o Google</span>
    </button>
  );
}
