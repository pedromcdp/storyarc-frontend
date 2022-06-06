import { ExclamationCircleIcon } from '@heroicons/react/solid';
import propTypes from 'prop-types';

export default function NoPosts({ text }) {
  return (
    <div className="flex flex-col items-center pt-2 space-y-2">
      <ExclamationCircleIcon className="w-8 h-8 text-verde lg:w-10 lg:h-10" />
      <p className="text-sm ">{text}</p>
    </div>
  );
}

NoPosts.propTypes = {
  text: propTypes.string.isRequired,
};
