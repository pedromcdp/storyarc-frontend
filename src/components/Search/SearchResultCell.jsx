import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

export default function SearchResultCell({ name }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(
      {
        pathname: `/search/${name}`,
        query: {
          rua: name,
        },
      },
      `/search/${name}`,
    );
  };

  return (
    <button
      onClick={(e) => handleClick(e)}
      className="py-2 px-3 hover:bg-gray-100 border-t-[0.5px] border-opacity-60 cursor-pointer"
    >
      {name}
    </button>
  );
}

SearchResultCell.propTypes = {
  name: PropTypes.string.isRequired,
};
