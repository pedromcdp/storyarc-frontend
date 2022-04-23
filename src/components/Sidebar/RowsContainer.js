export default function RowsContainer({ children, title, ariaText }) {
  return (
    <div className="mt-4">
      <p className="text-gray-500" tabIndex={0} aria-label={ariaText}>
        {title}
      </p>
      <div className="space-y-1 mt-2">{children}</div>
    </div>
  );
}
