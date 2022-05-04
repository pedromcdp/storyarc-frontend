import { useState, useRef } from 'react';
import Image from 'next/image';

export default function PostImage() {
  const [showPercentage, setShowPercentage] = useState(0.5);
  const imageContainer = useRef(undefined);

  const sReveal = (x) => {
    const containerBoundingRect =
      imageContainer.current.getBoundingClientRect();
    setShowPercentage(() => {
      if (x < containerBoundingRect.left) {
        return 0;
      }
      if (x > containerBoundingRect.right) {
        return 1;
      }
      return (x - containerBoundingRect.left) / containerBoundingRect.width;
    });
  };

  const handleMouseMove = (e) => {
    sReveal(e.clientX);
  };

  const handleMouseUp = () => {
    window.onmousemove = undefined;
    window.onmouseup = undefined;
  };

  const handleMouseDown = () => {
    window.onmousemove = handleMouseMove;
    window.onmouseup = handleMouseUp;
  };

  const handleTouchMove = (e) => {
    sReveal(e.touches.item(0).clientX);
  };

  const image =
    'https://i.pinimg.com/originals/6e/d1/f9/6ed1f92bac7709c9b772e0011db2d099.jpg';
  const newImage =
    'https://3.bp.blogspot.com/-sAA0poxFWe4/Wt-7FJWcp1I/AAAAAAAAHOc/dqDLRKuaYbEsZMywCQlk7mdRzBLCR4beQCLcBGAs/s1600/IMG_20180421_174012.jpg';

  return (
    <div className="h-56 md:h-72 lg:h-96">
      <div
        ref={imageContainer}
        className="group relative w-full h-full select-none"
      >
        <Image
          src={image}
          alt="foto de c"
          layout="fill"
          className="grayscale pointer-events-none"
          priority
        />
        <Image
          src={newImage}
          alt="foto de x"
          layout="fill"
          style={{
            clipPath: `polygon(0 0, ${showPercentage * 100}% 0, ${
              showPercentage * 100
            }% 100%, 0 100%)`,
          }}
          className="pointer-events-none"
          priority
        />
        <div
          style={{ left: `${showPercentage * 100}%` }}
          className="absolute inset-y-0 group-hover:opacity-100 sm:opacity-0"
        >
          <div className="relative h-full opacity-50 hover:opacity-100">
            <div
              role="slider"
              aria-valuenow={showPercentage * 100}
              tabIndex={0}
              style={{ touchAction: 'none' }}
              onMouseDown={handleMouseDown}
              onTouchMove={handleTouchMove}
              className="absolute inset-y-0 ml-[-0.5] w-1 bg-verde drop-shadow-md cursor-move"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
