import React from 'react';
import './TimeLineItem.css';

const TimeLineItem = (props) => {
  //console.log('[TimeLineItem] - props: ', props);

  return (
    <div className='item-container'>
      <div className='item-content'>
        <img
          style={{ width: '100%', height: 'auto' }}
          src={`/${props.memory.imageURL}`}
        />

        <p className='description'>{props.memory.description}</p>
        <p>{props.memory.date}</p>
      </div>
      <span className='circle'></span>
    </div>
  );
};

export default TimeLineItem;
