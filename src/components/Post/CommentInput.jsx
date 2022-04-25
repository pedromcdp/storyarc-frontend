import { useRef } from 'react';
import Image from 'next/image';
import { PaperAirplaneIcon } from '@heroicons/react/outline';

export default function CommentInput({ avatar, username }) {
  const commentRef = useRef(null);

  return (
    <div tabIndex={0} className="py-2 border-t flex space-x-2 items-center">
      <Image
        src={avatar}
        alt={username}
        width={40}
        height={45}
        layout="fixed"
        className="mask mask-squircle shadow-sm flex-none object-contain"
      />
      <input
        ref={commentRef}
        type="text"
        //   onChange={handleTyping}
        placeholder="Insere o teu comentário"
        className="flex-grow rounded-xl text-sm outline-none drop-shadow-sm border p-[0.60rem]"
      />
      <button className="rounded-full hover:scale-105 transition ease-out">
        <PaperAirplaneIcon className="w-6 h-6 rotate-90" />
      </button>
    </div>
  );
}
