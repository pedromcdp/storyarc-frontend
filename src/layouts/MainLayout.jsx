import { useEffect, useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import io from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import AddButton from '../components/AddButton';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { AppDialog } from '../components/Dialog';
import AddContent from '../components/AddContent/AddContent';
import AddLoader from '../components/AddContent/AddLoader';
import {
  useAddContent,
  useShowLoading,
} from '../features/addContent/addContentSlice';
import { useSearch } from '../features/search/searchSlice';
import MobileSearch from '../components/Search/MobileSearch';
import SkipToFeedBtn from '../components/SkipToFeedBtn';
import useAuth from '../hooks/auth';
import { useGetUserNotifications } from '../hooks/useQuery';

export default function MainLayout({ title, children }) {
  const { user, token, logout } = useAuth();
  const { refetch } = useGetUserNotifications(token);
  const isShowing = useSelector(useAddContent);
  const showLoading = useSelector(useShowLoading);
  const [notificationData, setNotificationData] = useState(null);
  const showMobileSearch = useSelector(useSearch);

  useEffect(() => {
    const socket = io('http://localhost:8081', {
      query: { userId: user?.uid },
    });
    if (user) {
      socket.on('notifications', (data) => {
        setNotificationData(data);
        refetch();
      });
    }
    return () => {
      socket.disconnect();
    };
  }, [user, refetch]);

  return (
    <div className="h-screen overflow-hidden bg-gray-100 antialiased">
      <Head>
        <title>{title || 'storyarc'}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <SkipToFeedBtn />
      {/* <Header /> */}
      <main className="relative flex">
        <Sidebar />
        {showMobileSearch && <MobileSearch />}
        <div className="flex h-screen grow flex-col">
          <nav className="flex h-20 w-full items-center justify-between border-b bg-white px-4">
            <form className="trasition flex items-center gap-2 duration-100 ease-in-out">
              <Link href="/" passHref>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mr-2 h-7 w-7 text-verde md:hidden"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </Link>
              <button onClick={() => logout()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 text-verde"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Pesquisar..."
                className="w-full text-sm outline-none"
              />
            </form>
            <section className="flex items-center divide-x">
              <Link href="/notifications" passHref>
                <a className="after:mr-30.5 relative flex items-center md:after:mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-verde after:mr-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                  <AnimatePresence>
                    {notificationData > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className={`absolute -top-2 right-[0.4rem] flex h-[1.1rem] w-[1.1rem] items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white`}
                      >
                        {notificationData}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </a>
              </Link>
              <Link
                href={{
                  pathname: `/user/${user?.uid}`,
                }}
                passHref
              >
                <div className="ml-2 flex cursor-pointer items-center gap-2 self-center before:mr-0.5 md:before:mr-3">
                  <Image
                    src={user ? user.photoURL : '/images/avatar.webp'}
                    alt={user ? user.displayName : 'avatar'}
                    className="squircleMask overflow-hidden object-cover"
                    width={32}
                    height={32}
                  />
                  <span className="truncate text-sm font-medium">
                    {user && user.displayName.split(' ')[0]}
                  </span>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 text-verde"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </section>
          </nav>
          <div
            id="scrollparent"
            className="grow overflow-y-auto scroll-smooth xl:mx-auto xl:flex xl:w-full xl:flex-row xl:justify-center xl:space-x-4"
          >
            <div
              id="feed"
              className="mx-auto h-screen max-w-md grow md:max-w-lg lg:max-w-2xl xl:mx-0"
            >
              {children}
            </div>
            <div className="top-5 mt-5 hidden max-w-xs grow xl:sticky xl:block">
              <div className="xl:max-w-xs">
                <AddButton />
                <Footer />
              </div>
            </div>
          </div>
        </div>
        <AppDialog />
        {isShowing && <AddContent />}
        {showLoading && <AddLoader />}
      </main>
    </div>
  );
}

MainLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any.isRequired,
};
