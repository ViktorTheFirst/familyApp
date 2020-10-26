import React, { Component } from 'react';
import './LiveFeed.css';

class LiveFeed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='live-container'>
        <div className='live-feed'>VIDEO FEED HERE</div>
        <div className='control-panel'>
          <div className='audio'>Audio</div>
          <div className='screenshot'>ScreenShot</div>
        </div>
      </div>
    );
  }
}

export default LiveFeed;
