import Image from 'next/image';
import propTypes from 'prop-types';

export default function ProfileHeader({ children }) {
  return (
    <div className="relative shrink-0 mt-5 w-full h-48 rounded-lg border shadow-sm transition-all ease-in-out md:h-56 lg:h-60">
      <Image
        src="/images/profilebg.webp"
        typeof="image/webp"
        alt="imagem banner do storyarc"
        layout="fill"
        className="object-center rounded-lg border brightness-75"
        priority
      />
      {children}
    </div>
  );
}

ProfileHeader.propTypes = {
  children: propTypes.node.isRequired,
};
