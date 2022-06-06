import propTypes from 'prop-types';

export default function ProfileData({ children }) {
  return (
    <div className="flex relative flex-col px-4 pt-[3.2rem] transition-all ease-in-out md:px-6 md:pt-14">
      {children}
    </div>
  );
}

propTypes.propTypes = {
  children: propTypes.node.isRequired,
};
