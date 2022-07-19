/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import {
  ClockIcon,
  DotsHorizontalIcon,
  LinkIcon,
  ExclamationCircleIcon,
  DocumentDownloadIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { useClipboard } from '@mantine/hooks';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../features/notification/notificationSlice';
import { pageUrl } from '../../utils/appUrls';
import downloadPhoto from '../../utils/downloadPhoto';
import { useDeletePost, useReportPost } from '../../hooks/useMutation';
import { useGetUserPosts } from '../../hooks/useQuery';
import useAuth from '../../hooks/auth';

export default function PostHeader({
  id,
  name,
  avatar,
  timestamp,
  image,
  newImage,
}) {
  const dispatch = useDispatch();
  const { user, token } = useAuth();
  const [ownPost, setOwnPost] = useState(false);
  const clipboard = useClipboard();
  const { data: ownPosts } = useGetUserPosts(user?.uid, token);
  const { mutateAsync: reportPost } = useReportPost();
  const { mutateAsync: deletePost } = useDeletePost();

  useEffect(() => {
    if (user) {
      if (ownPosts) {
        const isOwnPost = ownPosts.some((post) => post._id === id);
        setOwnPost(Boolean(isOwnPost));
      }
    }
  }, [ownPosts, id, user]);

  const handleCopyToClipboard = () => {
    clipboard.copy(`${pageUrl}/post/${id}`);
    dispatch(
      showNotification({
        type: 'link',
        title: 'Ligação copiada',
        subtitle: 'Ligacão copiada para a área de transferência',
      }),
    );
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
          {!ownPost || !user ? (
            <li
              tabIndex={0}
              onClick={async () => {
                const { data } = await reportPost(id);
                if (data) {
                  dispatch(
                    showNotification({
                      type: 'success',
                      title: 'Publicação reportada',
                      subtitle: 'O storyarc irá rever a publicação',
                    }),
                  );
                }
              }}
            >
              <span className="text-sm">
                <ExclamationCircleIcon className="w-5 h-5 text-red-500 " />
                Reportar publicação
              </span>
            </li>
          ) : (
            <li
              tabIndex={0}
              onClick={() => {
                deletePost({
                  postId: id,
                  token,
                }).then(() => {
                  dispatch(
                    showNotification({
                      type: 'info',
                      title: 'Publicação apagada',
                      subtitle: null,
                    }),
                  );
                });
              }}
            >
              <span className="text-sm">
                <TrashIcon className="w-5 h-5 text-red-500 " />
                Apagar publicação
              </span>
            </li>
          )}
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
