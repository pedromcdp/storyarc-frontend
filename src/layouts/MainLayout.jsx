import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AddButton from '../components/AddButton';
import { AppDialog } from '../components/Dialog';
import Footer from '../components/Footer';

export default function MainLayout({ title, children }) {
  return (
    <div className="overflow-hidden h-screen font-body antialiased bg-gray-100">
      <Head>
        <title>{title || 'storyarc'}</title>
      </Head>
      <Header />
      <main className="flex">
        <Sidebar />
        <div className="overflow-y-auto grow scroll-smooth xl:flex xl:flex-row xl:justify-center xl:mx-auto xl:space-x-4 xl:w-full">
          <div className="grow mx-auto max-w-md h-screen md:max-w-lg lg:max-w-2xl xl:mx-0">
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
      </main>
    </div>
  );
}

MainLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
