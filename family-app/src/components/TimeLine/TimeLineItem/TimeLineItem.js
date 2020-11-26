import React from 'react';
import './TimeLineItem.css';

const TimeLineItem = (props) => {
  //console.log('[TimeLineItem] - props: ', props);

  const parseDate = (date) => {
    // 2020-11-02T17:01:26.991+00:00
    const a = date.slice(0, 10); // "2020-11-02"
    const b = a.split('-'); // ["2020", "11", "02"]
    const c = b.reverse(); // ["02", "11", "2020" ]
    const d = c.join('/'); // "02/11/2020"
    return d;
  };

  return (
    <div className='item-container'>
      <div className='item-content'>
        <img
          style={{ width: '100%', height: 'auto' }}
          src={`/${props.memory.imageURL}`}
        />

        <p className='description'>{props.memory.description}</p>
      </div>
      <span className='circle'>{parseDate(props.memory.date)}</span>
    </div>
  );
};

export default TimeLineItem;
