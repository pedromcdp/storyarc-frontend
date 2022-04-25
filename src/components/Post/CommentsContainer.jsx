import CommentCell from './CommentCell';

export default function CommentsContainer() {
  return (
    <div className="pt-1 pb-4 w-full h-auto border-t">
      <h1 tabIndex={0} aria-label="Comentários">
        Comentários
      </h1>
      <div className="flex overflow-y-auto flex-col mt-1 space-y-2 max-h-80">
        {/* COMMENTSMAP */}
        <CommentCell />
      </div>
    </div>
  );
}
