import React, { useState, useEffect, useRef } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './Slider.scss';

const Slider = ({ sliderArr, autoPlay }) => {
  const autoPlayRef = useRef();
  useEffect(() => {
    autoPlayRef.current = goRight;
  });
  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };
    const interval = setInterval(play, autoPlay * 1000);
    return () => clearInterval(interval);
  }, []);

  const [x, setX] = useState(0);

  const goLeft = () => {
    x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100);
  };

  const goRight = () => {
    x === -100 * (sliderArr.length - 1) ? setX(0) : setX(x - 100);
  };

  //console.log('window.innerWidth: ', window.innerWidth);
  //console.log('window.innerHeight: ', window.innerHeight);

  return (
    <div className='slider'>
      {sliderArr.map((item, index) => {
        return (
          <div
            key={index}
            className='slide'
            style={{ transform: `translateX(${x}%)` }}
          >
            {item}
          </div>
        );
      })}
      <button id='goLeft' onClick={goLeft}>
        <ArrowBackIosIcon className='arrow' />
      </button>
      <button id='goRight' onClick={goRight}>
        <ArrowForwardIosIcon className='arrow' />
      </button>
    </div>
  );
};

export default Slider;
