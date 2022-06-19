/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useState } from 'react';
import Image from 'next/image';
import { PaperAirplaneIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import { useAddCommentMutation } from '../../services/storyarc';
import { useGetPostComments } from '../../hooks/useAPI';

export default function CommentInput({ user, id }) {
  const [comment, setComment] = useState('');
  const [addComment] = useAddCommentMutation();
  const { refetch } = useGetPostComments(id);

  const handleTyping = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await addComment({
      id,
      comment: {
        postId: id,
        user: user.uid,
        body: comment,
      },
    });
    if (data) {
      setComment('');
      refetch();
    }
  };

  return (
    <form
      tabIndex={0}
      className="flex items-center py-2 space-x-2 border-t"
      onSubmit={handleSubmit}
    >
      <Image
        src={user.photoURL}
        alt={user.displayName}
        width={40}
        height={45}
        layout="fixed"
        className="object-contain flex-none shadow-sm mask mask-squircle"
      />
      <input
        type="text"
        onChange={handleTyping}
        value={comment}
        placeholder="Insere o teu comentário"
        className="grow p-[0.60rem] text-sm rounded-xl border focus:border-verde outline-none drop-shadow-sm transition-colors duration-100 ease-in"
      />
      <button
        type="submit"
        aria-label="submeter comentário"
        className="group rounded-full transition ease-out"
        disabled={comment.length === 0}
      >
        <PaperAirplaneIcon className="w-6 h-6 hover:text-verde group-disabled:text-gray-100 disabled:opacity-0 transition-colors duration-100 ease-out rotate-90" />
      </button>
    </form>
  );
}

CommentInput.propTypes = {
  user: PropTypes.object.isRequired,
};
