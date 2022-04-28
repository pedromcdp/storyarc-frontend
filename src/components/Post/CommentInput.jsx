import { useRef } from 'react';
import Image from 'next/image';
import { PaperAirplaneIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';

export default function CommentInput({ user }) {
  const commentRef = useRef(null);

  return (
    <form tabIndex={0} className="flex items-center py-2 space-x-2 border-t">
      <Image
        src={user.avatar}
        alt={user.name}
        width={40}
        height={45}
        layout="fixed"
        className="object-contain flex-none shadow-sm mask mask-squircle"
      />
      <input
        ref={commentRef}
        type="text"
        //   onChange={handleTyping}
        placeholder="Insere o teu comentário"
        className="grow p-[0.60rem] text-sm rounded-xl border outline-none drop-shadow-sm"
      />
      <button
        type="submit"
        aria-label="submeter comentário"
        className="rounded-full transition ease-out"
      >
        <PaperAirplaneIcon className="w-6 h-6 rotate-90" />
      </button>
    </form>
  );
}

CommentInput.propTypes = {
  user: PropTypes.object.isRequired,
};
