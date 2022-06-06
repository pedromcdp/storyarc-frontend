import Lottie from 'lottie-react';
import searchAnimation from '../../animations/searching.json';

export default function SearchLoadingAnim() {
  return (
    <div className="flex justify-center w-full ">
      <Lottie animationData={searchAnimation} loop className="w-48 h-28" />
    </div>
  );
}
