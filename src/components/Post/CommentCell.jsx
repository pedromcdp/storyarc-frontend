/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import Image from 'next/image';
import dayjs from 'dayjs';
import { ClockIcon } from '@heroicons/react/outline';

export default function CommentCell() {
  return (
    <div className="flex items-start space-x-2 h-auto">
      <div className="relative flex-none w-10 h-10 rounded-full  shadow-sm">
        <Image
          alt="user avatar"
          src="https://lh3.googleusercontent.com/a-/AOh14Gh6dfOfIa2bIeA9aMRA1ENG9A36mKbPZFMkr_CCww=s96-c"
          layout="fill"
          className="object-contain mask mask-squircle"
        />
      </div>
      <div
        tabIndex={0}
        className="pt-1 pr-4 pb-2 pl-2 max-w-full rounded-r-2xl rounded-bl-2xl border drop-shadow-sm"
      >
        <p className="text-sm font-medium">Pedro Miguel Pereira</p>
        <div className="flex items-center pb-1 space-x-1 text-[0.65rem] text-gray-600">
          <ClockIcon className="w-3 h-3" />
          <p>{dayjs('2020-05-20T12:00:00.000Z').fromNow()}</p>
        </div>
        <p className="text-[0.8rem]">
          ultricies mi eget mauris pharetra et ultrices neque ornare aenean
          euismod elementum nisi quis eleifend! 😌
        </p>
      </div>
    </div>
  );
}
