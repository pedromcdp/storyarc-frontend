import Image from 'next/image';

export default function SidebarRow({ title, Icon, src }) {
  return (
    <button
      type="button"
      role="button"
      id={`${title}Button`}
      className="flex w-full space-x-[0.35rem] p-2 rounded-xl hover:bg-gray-100 hover:scale-105 transition duration-105 ease-out cursor-pointer items-center"
    >
      {src && (
        <Image
          src={src}
          alt={title}
          width={30}
          height={30}
          layout="fixed"
          className="mask mask-squircle"
        />
      )}
      {Icon && <Icon className="h-6 w-6 text-verde" />}
      <p>{title}</p>
    </button>
  );
}
