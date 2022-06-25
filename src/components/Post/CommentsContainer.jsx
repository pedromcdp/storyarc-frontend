/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import PropTypes from 'prop-types';
import CommentCell from './CommentCell';
import NoPosts from '../Profile/NoPosts';
import HourGlassLoadingAnim from '../Loading';
import { useGetPostComments } from '../../hooks/useAPI';

export default function CommentsContainer({ id }) {
  const { data, isLoading } = useGetPostComments(id);

  return (
    <div className="pt-1 pb-4 w-full h-auto border-t">
      <h1 tabIndex={0} aria-label="Comentários">
        Comentários
      </h1>
      <div className="flex overflow-y-auto flex-col mt-1 space-y-2 max-h-80">
        {isLoading ? (
          data?.length === 0 ? (
            <HourGlassLoadingAnim />
          ) : (
            data?.map((comment) => (
              <CommentCell key={comment._id} comment={comment} postId={id} />
            ))
          )
        ) : data?.length > 0 ? (
          data.map((comment) => (
            <CommentCell key={comment._id} comment={comment} postId={id} />
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
