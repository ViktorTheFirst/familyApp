import React from 'react';

const Slide = ({ imageURL }) => {
  return (
    <img
      src={imageURL}
      alt='slide-image'
      style={{
        width: '100%',
        height: '90vh',
        display: 'block',
        //marginLeft: '159px',
      }}
    />
  );
};

export default Slide;
