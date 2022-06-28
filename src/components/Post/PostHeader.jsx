/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import {
  ClockIcon,
  DotsHorizontalIcon,
  LinkIcon,
  ExclamationCircleIcon,
  DocumentDownloadIcon,
} from '@heroicons/react/outline';
import { useClipboard } from '@mantine/hooks';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { pageUrl } from '../../utils/appUrls';
import { useReportPostMutation } from '../../services/storyarc';
import downloadPhoto from '../../utils/downloadPhoto';
import Notification from '../Notification';

export default function PostHeader({
  id,
  name,
  avatar,
  timestamp,
  image,
  newImage,
}) {
  const clipboard = useClipboard();
  const [showPortal, setShowPortal] = useState(false);
  const [type, setType] = useState('success');
  const [title, setTitle] = useState(null);
  const [subtitle, setSubtitle] = useState(null);
  const [reportPost] = useReportPostMutation();

  const handleCopyToClipboard = () => {
    clipboard.copy(`${pageUrl}/post/${id}`);
    setShowPortal(true);
    setType('link');
    setTitle('Ligação copiada');
    setSubtitle('Ligacão copiada para a área de transferência');
  };

  const handleDownload = () => {
    downloadPhoto(image, `${nanoid()}.png`);
    if (newImage) downloadPhoto(newImage, `${nanoid()}.png`);
  };

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
          <li
            tabIndex={0}
            onClick={handleCopyToClipboard}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCopyToClipboard();
            }}
          >
            <span className="text-sm">
              <LinkIcon className="w-5 h-5" />
              Copiar ligação
            </span>
          </li>
          <li
            tabIndex={0}
            onClick={handleDownload}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleDownload();
            }}
          >
            <span className="text-sm">
              <DocumentDownloadIcon className="w-5 h-5" />
              Descarregar {newImage ? 'imagens' : 'imagem'}
            </span>
          </li>
          <div className="w-full h-[1.2px] bg-gray-100 rounded-2xl"></div>
          <li
            tabIndex={0}
            onClick={async () => {
              const { data } = await reportPost(id);
              if (data) {
                setShowPortal(true);
                setType('success');
                setTitle('Publicação reportada');
                setSubtitle('O storyarc irá rever a publicação');
              }
            }}
          >
            <span className="text-sm">
              <ExclamationCircleIcon className="w-5 h-5 text-red-500 " />
              Reportar publicação
            </span>
          </li>
        </ul>
      </div>
      <Notification
        show={showPortal}
        closeFn={() => setShowPortal(false)}
        type={type}
        title={title}
        subtitle={subtitle}
      />
    </div>
  );
}

PostHeader.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};
