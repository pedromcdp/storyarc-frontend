import Image from 'next/image';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  useFeedFilter,
  setSelectedFilter,
} from '../../features/feedFilter/feedFilterSlice';

export default function SidebarRow({ title, Icon, src, filter }) {
  const dispatch = useDispatch();
  const feedFilter = useSelector(useFeedFilter);

  const setFilter = () => {
    dispatch(setSelectedFilter(filter));
  };

  return (
    <button
      type="button"
      role="button"
      onClick={() => setFilter()}
      className={`flex justify-center items-center p-[0.2rem] space-x-[0.11rem] w-full rounded-xl transition ease-out cursor-pointer md:justify-start md:p-2 md:space-x-[0.35rem] duration-105 ${
        feedFilter.name === title
          ? 'bg-verde text-white scale-105'
          : 'hover:bg-gray-100 hover:md:scale-105'
      }`}
    >
      {src && (
        <Image
          src={src}
          alt={title}
          width={30}
          height={30}
          layout="fixed"
          className="mask mask-squircle"
        />
      )}
      {Icon && (
        <Icon
          className={`w-6 h-6 ${
            feedFilter.name === title ? 'text-white' : 'text-verde'
          }`}
        />
      )}
      <p className="text-[0.73rem] md:text-base">{title}</p>
    </button>
  );
}

SidebarRow.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  src: PropTypes.string,
  filter: PropTypes.object,
};
