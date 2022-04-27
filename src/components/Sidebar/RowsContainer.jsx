import PropTypes from 'prop-types';

export default function RowsContainer({ children, title, ariaText }) {
  return (
    <div className="md:mt-4 w-max-full">
      <p
        className="mb-1 text-sm tracking-wide text-gray-500 md:text-base"
        tabIndex={0}
        aria-label={ariaText}
      >
        {title}
      </p>
      <div className="flex justify-evenly md:block md:mt-2 md:space-y-1">
        {children}
      </div>
    </div>
  );
}

RowsContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  ariaText: PropTypes.string.isRequired,
};
