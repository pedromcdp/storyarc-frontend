/* eslint-disable no-nested-ternary */
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { AnimateSharedLayout, motion } from 'framer-motion';
import CardView from '../Post/CardView';
import NoPosts from './NoPosts';
import HourGlassLoadingAnim from '../Loading';

export default function PostsTabs({ ownPosts, savedPosts, isLoading }) {
  return (
    <div className="overflow-auto scroll-smooth pb-32 pt-5">
      <Tab.Group>
        <Tab.List className="mb-2 flex items-center justify-center space-x-4 rounded-md border bg-white">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`border-b-2 px-4 py-2 text-sm outline-none transition duration-100 ease-in-out lg:text-base ${
                  selected ? 'border-verde' : 'border-transparent'
                }`}
              >
                Publicações Próprias
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`border-b-2 px-4 py-2 text-sm outline-none transition  duration-100 ease-in-out lg:text-base ${
                  selected ? 'border-verde' : 'border-transparent'
                }`}
              >
                Publicações Guardadas
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <AnimateSharedLayout>
              <motion.div layout>
                {isLoading ? (
                  <HourGlassLoadingAnim />
                ) : ownPosts.length > 0 ? (
                  ownPosts.map((post) => (
                    <CardView key={post._id} post={post} />
                  ))
                ) : (
                  <NoPosts text="Sem Publicações" />
                )}
              </motion.div>
            </AnimateSharedLayout>
          </Tab.Panel>
          <Tab.Panel>
            {savedPosts?.savedPosts.length ? (
              savedPosts.savedPosts.map((post) => (
                <CardView key={post._id} post={post} />
              ))
            ) : (
              <NoPosts text="Sem Publicações" />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
