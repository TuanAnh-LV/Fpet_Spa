import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { assets } from '../../assets/assets';

const Slide = () => {
  const slides = [
    {
      url: assets.Slider_1,
    },
    {
      url: assets.Slider_2,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Chuyển đổi slide sau mỗi 5 giây

    return () => {
      clearInterval(interval); // Xóa bỏ interval khi component unmount
    };
  }, [slides.length]); // Dependency array chỉ cần slides.length để đảm bảo useEffect được gọi lại khi slides thay đổi


  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='max-w-[1196px] h-[424px] w-full m-auto pt-[14px] relative group'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
      ></div>

      
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer ${
              currentIndex === slideIndex ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slide;
