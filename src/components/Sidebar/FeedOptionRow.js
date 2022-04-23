export default function FeedOptionRow({ title, Icon }) {
  return (
    <button
      type="button"
      role="button"
      id={`${title}Button`}
      className="flex w-full space-x-2 p-2 rounded-xl hover:bg-gray-100 hover:scale-105 transition duration-105 ease-out cursor-pointer"
    >
      <Icon className="h-6 w-6 text-verde" />
      <p>{title}</p>
    </button>
  );
}
