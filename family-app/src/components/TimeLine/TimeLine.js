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
      imageURL: 'imgUpload.png',
    };
  }

  render() {
    return (
      <div className='timeline-container'>
        {this.props.memories.map((mem) => (
          <TimeLineItem memory={mem} key={mem._id} />
        ))}
        <div onClick={this.props.select} style={{ cursor: 'pointer' }}>
          <TimeLineItem memory={this.lastMemory} />
        </div>
      </div>
    );
  }
}

export default TimeLine;
