/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="pt-2 mt-3 border-t border-gray-200">
      <p className="text-sm text-gray-500">
        Desenvolvido na
        <span className="text-verde">Universidade de Aveiro</span> com muito
        <span className="before:ml-[0.15rem] text-red-500">&#9829;</span>
      </p>
      <ul className="flex flex-wrap mt-2 text-sm text-gray-500">
        <li className="cursor-pointer footerItem">
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
      <p className="mt-5 text-sm text-gray-500 uppercase">storyarc © 2022</p>
    </footer>
  );
}
