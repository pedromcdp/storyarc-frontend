import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import { setCookie } from 'nookies';
import SidebarLogo from '../Sidebar/SidebarLogo';

export default function CookieBox() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Transition show={show} appear={false}>
      <Transition.Child
        enter="ease-in-out duration-500"
        enterFrom="translate-y-full sm:-translate-y-0 sm:translate-x-full opacity-0"
        enterTo="sm:translate-x-0 opacity-100"
        leave="ease-out duration-500"
        leaveFrom="translate-y-0 sm:translate-x-0 opacity-100"
        leaveTo="translate-y-full sm:-translate-y-0 sm:translate-x-full opacity-0"
        className="items fixed bottom-5 right-1/2 flex w-[90%] translate-x-1/2 flex-col rounded-2xl border bg-white px-6 py-4 shadow-sm transition-all duration-75 ease-in-out sm:right-5 sm:max-w-sm sm:translate-x-0"
      >
        <SidebarLogo />
        <p className="text-sm">
          O storyarc usa{' '}
          <span className="text-xl font-medium text-verde">cookies</span> para
          te oferecer as informações mais relevantes. Por favor, aceita as{' '}
          <span className="text-xl font-medium text-verde">cookies</span> para a
          performace ideal!
        </p>
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={() => {
              setCookie(undefined, 'acceptedCookies', 'true', {
                path: '/',
              });
              setShow(false);
            }}
            className="durantion-100 rounded-lg border border-verde bg-verde px-4 py-3 text-white transition ease-in-out hover:bg-white hover:text-verde"
          >
            Aceitar cookies
          </button>
          <Link href="/cookies" passHref>
            <a className="underline decoration-verde underline-offset-[0.3rem]">
              Mais informações
            </a>
          </Link>
        </div>
      </Transition.Child>
    </Transition>
  );
}
