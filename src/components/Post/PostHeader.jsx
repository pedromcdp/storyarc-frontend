import Image from 'next/image';
import dayjs from 'dayjs';
import {
  ClockIcon,
  DotsHorizontalIcon,
  LinkIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/outline';
import PropTypes from 'prop-types';

export default function PostHeader({ name, avatar, timestamp }) {
  return (
    <div tabIndex={0} className="flex items-center justify-between">
      <div className="flex space-x-2 items-center">
        <Image
          src={avatar}
          width={45}
          height={45}
          alt={`Foto de perfil de ${name}`}
          layout="fixed"
          className="mask mask-squircle"
        />
        <div className="flex flex-col">
          <span>{name}</span>
          <div className="flex space-x-1 text-gray-600">
            <ClockIcon className="w-4 h-4" />
            <span className="text-xs">
              {`Publicado ${dayjs(timestamp).fromNow()}`}
            </span>
          </div>
        </div>
      </div>
      <div className="hover:bg-gray-100 p-[0.45rem] rounded-full cursor-pointer dropdown dropdown-end">
        <DotsHorizontalIcon tabIndex={0} className="w-5 h-5" />
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 drop-shadow-lg bg-white rounded-box w-60"
        >
          <li tabIndex={0}>
            <a className="text-sm">
              <LinkIcon className="w-5 h-5" />
              Copiar ligação
            </a>
          </li>
          <li tabIndex={0}>
            <a className="text-sm">
              <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
              Reportar publicação
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

PostHeader.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};
