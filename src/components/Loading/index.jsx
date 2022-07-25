import Lottie from 'lottie-react';
import loadingAnimation from '../../animations/loading.json';

export default function HourGlassLoadingAnim({ size }) {
  return (
    <div className="flex justify-center pt-5 w-full">
      <Lottie
        animationData={loadingAnimation}
        loop
        className={`${
          size === 'xs' ? 'w-16 h-16' : 'w-24 h-24'
        }  bg-white rounded-full border shadow-sm`}
      />
    </div>
  );
}
