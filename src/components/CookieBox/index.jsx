/* eslint-disable jsx-a11y/anchor-is-valid */
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
        className="flex fixed right-1/2 bottom-5 flex-col py-4 px-6 w-[90%] bg-white rounded-2xl border shadow-sm transition-all duration-75 ease-in-out translate-x-1/2 sm:right-5 sm:max-w-sm sm:translate-x-0 items"
      >
        <SidebarLogo />
        <p className="text-sm">
          O storyarc usa{' '}
          <span className="text-xl font-medium text-verde">cookies</span> para
          te oferecer as informações mais relevantes. Por favor, aceita as{' '}
          <span className="text-xl font-medium text-verde">cookies</span> para a
          performace ideal!
        </p>
        <div className="flex gap-3 items-center mt-5">
          <button
            onClick={() => {
              setCookie(null, 'acceptedCookies', 'ouioui');
              setShow(false);
            }}
            className="py-3 px-4 text-white hover:text-verde bg-verde hover:bg-white rounded-lg border border-verde transition ease-in-out durantion-100"
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
