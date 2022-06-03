/* eslint-disable no-nested-ternary */
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import CardView from '../Post/CardView';
import NoPosts from './NoPosts';

export default function PostsTabs({
  ownPosts,
  savedPosts,
  refetch,
  isLoading,
  isFetching,
}) {
  return (
    <div className="overflow-auto py-5 scroll-smooth">
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
            {isLoading || isFetching ? (
              <>
                <h1>loading...</h1>
              </>
            ) : ownPosts.length > 0 ? (
              ownPosts.map((post) => (
                <CardView key={post.id} post={post} ownPost refetch={refetch} />
              ))
            ) : (
              <NoPosts text="Sem Publicações" />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {savedPosts?.savedPosts.length ? (
              savedPosts.savedPosts.map((post) => (
                <CardView key={post.id} post={post} />
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
