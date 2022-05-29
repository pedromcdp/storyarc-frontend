import Image from 'next/image';
import propTypes from 'prop-types';

export default function Avatar({ user }) {
  return (
    <div className="absolute -bottom-12 left-8 w-24 h-24 bg-red-100 rounded-full border-4 border-gray-100 transition-all ease-in-out md:-bottom-14 md:w-28 md:h-28">
      <Image
        src={user.photoURL}
        alt={`foto de perfil de ${user.displayName}`}
        layout="fill"
        className="object-contain object-center rounded-full"
        priority
      />
    </div>
  );
}

Avatar.propTypes = {
  user: propTypes.shape({
    displayName: propTypes.string.isRequired,
    photoURL: propTypes.string.isRequired,
  }).isRequired,
};
