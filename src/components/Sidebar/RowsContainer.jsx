/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import PropTypes from 'prop-types';

export default function RowsContainer({
  children,
  title,
  ariaText,
  moreClasses,
}) {
  return (
    <section className={`w-max-full md:mt-4 ${moreClasses}`}>
      <h1
        className="mb-1 text-sm tracking-wide text-gray-500 focus:outline-verde"
        tabIndex={0}
        aria-label={ariaText}
      >
        {title}
      </h1>
      <div className="flex justify-evenly gap-2 md:mt-2 md:block md:space-y-1">
        {children}
      </div>
    </section>
  );
}

RowsContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  ariaText: PropTypes.string.isRequired,
  moreClasses: PropTypes.string,
};
