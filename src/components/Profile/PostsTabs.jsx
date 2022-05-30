import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

export default function PostsTabs() {
  return (
    <div className="pt-5">
      <Tab.Group>
        <Tab.List className="flex justify-center items-center space-x-4 bg-white rounded-md border">
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
          <Tab.Panel>Content 1</Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
