import Image from 'next/image';
import PropTypes from 'prop-types';

export default function SidebarRow({ title, Icon, src }) {
  return (
    <button
      type="button"
      role="button"
      id={`${title}Button`}
      className="flex justify-center items-center p-[0.2rem] space-x-[0.11rem] w-full hover:bg-gray-100 rounded-xl transition ease-out hover:scale-105 cursor-pointer md:justify-start md:p-2 md:space-x-[0.35rem] duration-105"
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
      {Icon && <Icon className="w-6 h-6 text-verde" />}
      <p className="text-[0.73rem] md:text-base">{title}</p>
    </button>
  );
}

SidebarRow.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  src: PropTypes.string,
};
