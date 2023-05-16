import Image from 'next/image';
import propTypes from 'prop-types';

export default function ProfileHeader({ children }) {
  return (
    <div className="relative mt-5 h-48 w-full shrink-0 rounded-lg border shadow-sm transition-all ease-in-out md:h-56 lg:h-60">
      <Image
        src="/images/profilebg.webp"
        typeof="image/webp"
        alt="imagem banner do storyarc"
        layout="fill"
        className="rounded-lg border object-center brightness-75"
        priority
      />
      {children}
    </div>
  );
}

ProfileHeader.propTypes = {
  children: propTypes.node.isRequired,
};
