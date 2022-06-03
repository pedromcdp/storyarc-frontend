/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import PropTypes from 'prop-types';
import CommentCell from './CommentCell';
import NoPosts from '../Profile/NoPosts';
import { useGetPostCommentsQuery } from '../../services/storyarc';

export default function CommentsContainer({ id }) {
  const {
    data: comments,
    isLoading,
    isFetching,
  } = useGetPostCommentsQuery({
    postId: id,
  });

  return (
    <div className="pt-1 pb-4 w-full h-auto border-t">
      <h1 tabIndex={0} aria-label="Comentários">
        Comentários
      </h1>
      <div className="flex overflow-y-auto flex-col mt-1 space-y-2 max-h-80">
        {isLoading || isFetching ? (
          <>
            <h1>loading...</h1>
          </>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCell key={comment.id} comment={comment} />
          ))
        ) : (
          <NoPosts text="Sem comentários" />
        )}
      </div>
    </div>
  );
}

CommentsContainer.propTypes = {
  id: PropTypes.string.isRequired,
};
