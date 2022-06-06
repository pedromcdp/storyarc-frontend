/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import PropTypes from 'prop-types';

export default function PostDescription({ description }) {
  return (
    <p tabIndex={0} className="py-4">
      {description}
    </p>
  );
}

PostDescription.propTypes = {
  description: PropTypes.string.isRequired,
};
