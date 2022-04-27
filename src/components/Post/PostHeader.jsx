import Image from 'next/image';
import dayjs from 'dayjs';
import {
  ClockIcon,
  DotsHorizontalIcon,
  LinkIcon,
  ExclamationCircleIcon,
  DocumentDownloadIcon,
} from '@heroicons/react/outline';
import PropTypes from 'prop-types';

export default function PostHeader({ name, avatar, timestamp }) {
  return (
    <div tabIndex={0} className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
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
          <div className="flex space-x-1 text-gray-500">
            <ClockIcon className="w-4 h-4" />
            <span className="text-xs">
              {`Publicado ${dayjs(timestamp).fromNow()}`}
            </span>
          </div>
        </div>
      </div>
      <div
        tabIndex={0}
        className="p-[0.45rem] hover:bg-gray-100 rounded-full cursor-pointer dropdown dropdown-end"
      >
        <DotsHorizontalIcon className="w-5 h-5" />
        <ul className="p-2 w-60 bg-white drop-shadow-lg dropdown-content menu rounded-box">
          <li tabIndex={0}>
            <span className="text-sm">
              <LinkIcon className="w-5 h-5" />
              Copiar ligação
            </span>
          </li>
          <li tabIndex={0}>
            <span className="text-sm">
              <DocumentDownloadIcon className="w-5 h-5" />
              Descarregar imagem
            </span>
          </li>
          <div className="w-full h-[1.2px] bg-gray-100 rounded-2xl"></div>
          <li tabIndex={0}>
            <span className="text-sm">
              <ExclamationCircleIcon className="w-5 h-5 text-red-500 " />
              Reportar publicação
            </span>
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
