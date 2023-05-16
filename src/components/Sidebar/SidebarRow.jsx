import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  useFeedFilter,
  setSelectedFilter,
} from '../../features/feedFilter/feedFilterSlice';
import { openDialog } from '../../features/dialog/dialogSlice';
import { openAddContent } from '../../features/addContent/addContentSlice';
import useAuth from '../../hooks/auth';

export default function SidebarRow({
  title,
  Icon,
  src,
  filter,
  loginBtn,
  addBtn,
  href,
}) {
  const dispatch = useDispatch();
  const feedFilter = JSON.parse(useSelector(useFeedFilter));
  const router = useRouter();
  const { user } = useAuth();

  const handleButtonClick = () => {
    if (filter) {
      if (router.pathname !== '/') {
        router.push('/', undefined, { shallow: true });
        dispatch(setSelectedFilter(JSON.stringify(filter)));
      } else {
        dispatch(setSelectedFilter(JSON.stringify(filter)));
      }
    } else if (loginBtn) {
      router.push(href);
    } else if (addBtn) {
      if (!user) {
        dispatch(openDialog());
      } else {
        dispatch(openAddContent());
      }
    } else {
      router.push(`/search/${title}`);
    }
  };

  return (
    <button
      type="button"
      onClick={() => handleButtonClick()}
      className={`duration-105 flex w-full cursor-pointer items-center justify-center space-x-[0.11rem]  border-e-2 p-[0.2rem] transition ease-out focus:outline-verde md:justify-start  md:space-x-[0.35rem] md:py-2 md:pr-2 ${
        feedFilter.name === title
          ? 'scale-105 border-verde'
          : 'border-transparent hover:rounded-sm hover:bg-gray-50 hover:md:scale-105'
      }`}
    >
      {src && (
        <Image
          src={src}
          alt={title}
          width={30}
          height={30}
          layout="fixed"
          className="mask mask-squircle object-cover"
        />
      )}
      {Icon && <Icon className={`h-6 w-6 text-verde`} />}
      <p className="text-sm ">{title}</p>
    </button>
  );
}

SidebarRow.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  src: PropTypes.string,
  filter: PropTypes.object,
  loginBtn: PropTypes.bool,
  addBtn: PropTypes.bool,
  href: PropTypes.string,
};
