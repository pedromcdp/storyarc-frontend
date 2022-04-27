export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
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
      <p className="mt-4 text-sm text-gray-500 uppercase">storyarc © 2022</p>
    </footer>
  );
}
