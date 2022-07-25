import PropTypes from 'prop-types';

export default function ShowSearchTerm({ term }) {
  return (
    <div className="p-3 mt-5 bg-white rounded-xl border shadow-sm">
      <h1>
        Resultados de:{' '}
        <span className="font-medium text-verde underline">{term}</span>
      </h1>
    </div>
  );
}

ShowSearchTerm.propTypes = {
  term: PropTypes.string.isRequired,
};
