import { useState, useRef } from 'react';
import Image from 'next/image';

export default function PostImage({ image, newImage, description }) {
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

  return (
    <div className="overflow-hidden h-56 md:h-72 lg:h-96">
      <div
        ref={imageContainer}
        className="group relative w-full h-full select-none"
      >
        <Image
          src={image}
          alt={description}
          layout="fill"
          className={`${newImage && 'grayscale'} pointer-events-none`}
          priority
        />
        {newImage && (
          <>
            <Image
              src={newImage}
              alt={description}
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
              className="absolute inset-y-0 group-hover:opacity-100 lg:opacity-0"
            >
              <div className="relative h-full opacity-100">
                <div
                  role="slider"
                  aria-valuenow={showPercentage * 100}
                  tabIndex={0}
                  style={{ touchAction: 'none' }}
                  onMouseDown={handleMouseDown}
                  onTouchMove={handleTouchMove}
                  className="absolute inset-y-0 ml-[-3.65rem] w-28 hover:opacity-100 lg:opacity-50"
                >
                  <div className="absolute inset-y-0 left-1/2 justify-center w-1 bg-verde cursor-move item-center" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
