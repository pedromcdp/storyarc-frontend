import propTypes from 'prop-types';

export default function ProfileData({ children }) {
  return (
    <div className="relative flex flex-col px-4 pt-[3.2rem] transition-all ease-in-out md:px-2 md:pt-12">
      {children}
    </div>
  );
}

propTypes.propTypes = {
  children: propTypes.node.isRequired,
};
