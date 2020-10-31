import React, { Component, Fragment } from 'react';
import TimeLineItem from './TimeLineItem/TimeLineItem';
import './TimeLine.css';

class TimeLine extends Component {
  constructor(props) {
    super(props);
    console.log('[TimeLine] - constructor props', props);
    this.lastMemory = {
      date: '',
      description: '',
      imageURL: 'addImage.jpg',
    };
  }

  addImage = () => {
    this.props.select();
  };
  render() {
    return (
      <div className='timeline-container'>
        {this.props.memories.map((mem) => (
          <TimeLineItem memory={mem} key={mem._id} />
        ))}
        {/* TODO: explore ref warning */}
        {/* <div onClick={this.addImage} style={{ cursor: 'pointer' }}> */}
        <TimeLineItem memory={this.lastMemory} />
        {/* </div> */}
      </div>
    );
  }
}

export default TimeLine;
