import Image from 'next/image';
import { auth, googleProvider } from '../../firebase/firebase';

export default function GoogleLoginButton() {
  const handleLoginWithGoogle = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(googleProvider)
      .catch((error) => console.log(`Ocorreu um erro: ${error.message}`));
  };

  return (
    <button
      type="button"
      onClick={(e) => handleLoginWithGoogle(e)}
      aria-label="botão para iniciar sessão com o Google"
      className="flex justify-center py-3 px-4 space-x-2 w-full bg-white hover:bg-gray-100 rounded-md border shadow-sm  transition duration-100 ease-in-out"
    >
      <Image
        src="/images/glogo.webp"
        typeof="image/webp"
        alt="google logo"
        width="24rem"
        height="24rem"
        layout="fixed"
        priority
      />
      <span className="ml-2">Inicia sessão com o Google</span>
    </button>
  );
}
