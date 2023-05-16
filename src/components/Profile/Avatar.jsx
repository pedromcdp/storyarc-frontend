import Image from 'next/image';
import propTypes from 'prop-types';

export default function Avatar({ user }) {
  return (
    <div className="squircleMask absolute -bottom-12 left-8 h-24 w-24 border-4 border-white bg-white transition-all ease-in-out md:-bottom-12 md:h-28 md:w-28">
      <Image
        src={user.photoURL ?? user.avatar}
        alt={`foto de perfil de ${user.displayName ?? user.name}`}
        layout="fill"
        className="squircleMask object-contain object-center"
        priority
      />
    </div>
  );
}

Avatar.propTypes = {
  user: propTypes.shape({
    displayName: propTypes.string,
    photoURL: propTypes.string,
    avatar: propTypes.string,
    name: propTypes.string,
  }).isRequired,
};
