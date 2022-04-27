export default function Footer() {
  return (
    <footer className="pt-2 mt-3 border-t border-gray-200">
      <p className="text-sm text-gray-500">
        Desenvolvido na{' '}
        <span className="text-verde">Universidade de Aveiro</span> com muito
        <span className="before:ml-[0.15rem] text-red-500">&#9829;</span>
      </p>
      <ul role="list" className="flex flex-wrap mt-2 text-sm text-gray-500">
        <li className="cursor-pointer footerItem">
          <a href="#">
            <span className="hover:underline">Cookies</span>
          </a>
        </li>
        <li className="footerItem">
          <a href="#">
            <span className="hover:underline">Termos e condições</span>
          </a>
        </li>
        <li className="cursor-pointer">
          <a href="#">
            <span className="hover:underline">Política de privacidade</span>
          </a>
        </li>
      </ul>
      <p className="mt-5 text-sm text-gray-500 uppercase">storyarc © 2022</p>
    </footer>
  );
}
