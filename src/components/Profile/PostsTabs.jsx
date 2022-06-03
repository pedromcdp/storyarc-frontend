import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import CardView from '../Post/CardView';
import NoPosts from './NoPosts';

export default function PostsTabs({ ownPosts, savedPosts }) {
  return (
    <div className="pt-5">
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
            {ownPosts?.length ? (
              <CardView />
            ) : (
              <NoPosts text="Sem Publicações" />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {savedPosts?.savedPosts.length ? (
              <CardView />
            ) : (
              <NoPosts text="Sem Publicações" />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
