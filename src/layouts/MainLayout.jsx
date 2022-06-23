import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AddButton from '../components/AddButton';
import { AppDialog } from '../components/Dialog';
import Footer from '../components/Footer';
import AddContent from '../components/AddContent/AddContent';
import AddLoader from '../components/AddContent/AddLoader';
import {
  useAddContent,
  useShowLoading,
} from '../features/addContent/addContentSlice';
import { useSearch } from '../features/search/searchSlice';
import MobileSearch from '../components/Search/MobileSearch';
import SkipToFeedBtn from '../components/SkipToFeedBtn';

export default function MainLayout({ title, children }) {
  const isShowing = useSelector(useAddContent);
  const showLoading = useSelector(useShowLoading);
  const showMobileSearch = useSelector(useSearch);

  return (
    <div className="overflow-hidden h-screen antialiased bg-gray-100">
      <Head>
        <title>{title || 'storyarc'}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Header />
      <main className="flex relative">
        <SkipToFeedBtn />
        <Sidebar />
        {showMobileSearch && <MobileSearch />}
        <div
          id="scrollparent"
          className="overflow-y-auto grow scroll-smooth xl:flex xl:flex-row xl:justify-center xl:mx-auto xl:space-x-4 xl:w-full"
        >
          <div
            id="feed"
            className="grow mx-auto max-w-md h-screen md:max-w-lg lg:max-w-2xl xl:mx-0"
          >
            {children}
          </div>
          <div className="hidden top-5 grow mt-5 max-w-xs xl:block xl:sticky">
            <div className="xl:max-w-xs">
              <AddButton />
              <Footer />
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
