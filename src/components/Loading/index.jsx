import Lottie from 'lottie-react';
import loadingAnimation from '../../animations/loading.json';

export default function HourGlassLoadingAnim() {
  return (
    <div className="flex justify-center pt-5 w-full">
      <Lottie
        animationData={loadingAnimation}
        loop
        className="w-24 h-24 bg-white rounded-full border shadow-sm"
      />
    </div>
  );
}
