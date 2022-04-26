import { useRef } from 'react';
import Image from 'next/image';
import { PaperAirplaneIcon } from '@heroicons/react/outline';

export default function CommentInput({ avatar, username }) {
  const commentRef = useRef(null);

  return (
    <div tabIndex={0} className="flex items-center py-2 space-x-2 border-t">
      <Image
        src={avatar}
        alt={username}
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
    </div>
  );
}
