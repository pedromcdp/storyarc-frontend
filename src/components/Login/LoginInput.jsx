import PropTypes from 'prop-types';

export default function LoginInput({ placeholder, id, type }) {
  return (
    <input
      type={type}
      className="py-3 px-4 m-0 mb-6 w-full 
      rounded-lg border focus:border-verde border-solid focus:outline-none shadow transition ease-in-out form-control"
      id={id}
      placeholder={placeholder}
    />
  );
}

LoginInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
