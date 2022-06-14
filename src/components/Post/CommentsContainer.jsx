/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import PropTypes from 'prop-types';
import CommentCell from './CommentCell';
import NoPosts from '../Profile/NoPosts';
import HourGlassLoadingAnim from '../Loading';
import { useGetPostCommentsQuery } from '../../services/storyarc';

export default function CommentsContainer({ id }) {
  const {
    data: comments,
    currentData,
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
          currentData?.length === 0 ? (
            <HourGlassLoadingAnim />
          ) : (
            currentData?.map((comment) => (
              <CommentCell
                key={`${comment.id}-old`}
                comment={comment}
                postId={id}
              />
            ))
          )
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCell key={comment.id} comment={comment} postId={id} />
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
