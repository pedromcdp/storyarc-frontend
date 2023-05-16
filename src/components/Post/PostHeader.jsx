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
import Link from 'next/link';
import { showNotification } from '../../features/notification/notificationSlice';
import { pageUrl } from '../../utils/appUrls';
import downloadPhoto from '../../utils/downloadPhoto';
import { useDeletePost, useReportPost } from '../../hooks/useMutation';
import { useGetUserPosts } from '../../hooks/useQuery';
import useAuth from '../../hooks/auth';

export default function PostHeader({
  uid,
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
    <div tabIndex={0} className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Link href={`/user/${uid}`} passHref>
          <Image
            src={avatar}
            width={45}
            height={45}
            alt={`Foto de perfil de ${name}`}
            layout="fixed"
            className="mask mask-squircle cursor-pointer"
          />
        </Link>
        <div className="flex flex-col">
          <Link href={`/user/${uid}`} passHref>
            <span className="cursor-pointer select-none">{name}</span>
          </Link>
          <div className="flex space-x-1 text-gray-500">
            <ClockIcon className="h-4 w-4" />
            <span className="text-xs">
              {`Publicado ${dayjs(timestamp).fromNow()}`}
            </span>
          </div>
        </div>
      </div>
      <div
        tabIndex={0}
        className="dropdown-end dropdown cursor-pointer rounded-full p-[0.45rem] hover:bg-gray-100"
      >
        <DotsHorizontalIcon className="h-5 w-5" />
        <ul className="dropdown-content menu rounded-box w-60 bg-white p-2 drop-shadow-lg">
          <li
            tabIndex={0}
            onClick={handleCopyToClipboard}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCopyToClipboard();
            }}
          >
            <span className="text-sm">
              <LinkIcon className="h-5 w-5" />
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
              <DocumentDownloadIcon className="h-5 w-5" />
              Descarregar {newImage ? 'imagens' : 'imagem'}
            </span>
          </li>
          <div className="h-[1.2px] w-full rounded-2xl bg-gray-100"></div>
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
                <ExclamationCircleIcon className="h-5 w-5 text-red-500 " />
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
                <TrashIcon className="h-5 w-5 text-red-500 " />
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
