import PropTypes from 'prop-types';

export default function RowsContainer({ children, title, ariaText }) {
  return (
    <div className="mt-4">
      <p className="text-gray-500" tabIndex={0} aria-label={ariaText}>
        {title}
      </p>
      <div className="mt-2 space-y-1">{children}</div>
    </div>
  );
}

RowsContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  ariaText: PropTypes.string.isRequired,
};
