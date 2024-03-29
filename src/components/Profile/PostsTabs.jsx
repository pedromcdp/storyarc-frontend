/* eslint-disable no-nested-ternary */
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { AnimateSharedLayout, motion } from 'framer-motion';
import CardView from '../Post/CardView';
import NoPosts from './NoPosts';
import HourGlassLoadingAnim from '../Loading';

export default function PostsTabs({ ownPosts, savedPosts, isLoading }) {
  return (
    <div className="overflow-auto pt-5 pb-32 scroll-smooth">
      <Tab.Group>
        <Tab.List className="flex justify-center items-center mb-2 space-x-4 bg-white rounded-md border">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`border-b-2 py-2 px-4 lg:text-base text-sm ${
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
                className={`border-b-2 py-2 px-4 lg:text-base text-sm ${
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
