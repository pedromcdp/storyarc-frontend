import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-3 border-t border-gray-200 pt-2">
      <p className="text-sm text-gray-500">
        Desenvolvido na{' '}
        <a href="https://www.ua.pt/" className="text-verde">
          Universidade de Aveiro
        </a>{' '}
        com muito
        <span className="text-red-500 before:ml-[0.15rem]">&#9829;</span>
      </p>
      <ul className="mt-2 flex flex-wrap text-sm text-gray-500">
        <li className="footerItem cursor-pointer">
          <Link href="/cookies" passHref>
            <a className="hover:underline">Cookies</a>
          </Link>
        </li>
        <li className="footerItem">
          <Link href="/terms" passHref>
            <a className="hover:underline">Termos e condições</a>
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link href="/privpolicy" passHref>
            <a className="hover:underline">Política de privacidade</a>
          </Link>
        </li>
      </ul>
      <p className="mt-5 text-sm uppercase text-gray-500">
        storyarc © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
