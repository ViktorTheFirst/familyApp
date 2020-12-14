import React, { Component } from 'react';
import { connect } from 'react-redux';
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
          <TimeLineItem
            memory={mem}
            key={mem._id}
            admin={this.props.isAdmin}
            delete={this.props.delete} //activated by child
          />
        ))}
        <div onClick={this.props.select}>
          <TimeLineItem
            memory={this.lastMemory}
            admin={this.props.isAdmin}
            dummy={true}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isAdmin: state.userRed.currUser.isAdmin };
};

export default connect(mapStateToProps, null)(TimeLine);
