import React, { Component } from 'react';
import './Map.css';
import mapImage from '..//../assets/worldMap2.jpg';
import tempImage from '..//..//assets/img_15.jpg';
import { connect } from 'react-redux';

class Map extends Component {
  constructor(props) {
    super(props);
    console.log('constructor EXECUTES');
    this.state = {
      users: props.usrs,
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps EXECUTES');
    return state;
  }

  componentDidMount() {
    console.log('componentDidMount EXECUTES');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate EXECUTES');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate EXECUTES');
  }

  render() {
    console.log('render EXECUTES');
    return (
      <div className='map-container'>
        <div className='map-position-container'>
          <div className='map-image-container'>
            <img src={mapImage} className='map-image' />
          </div>
          <div className='position-container'>
            <p>my position: Israel, Ber-sheva </p>
            <button>Change my position</button>
          </div>
        </div>
        <div className='member-list'>
          {this.state.users.map((member) => (
            <div className='member-line'>
              <h2>
                {member.name}
                {member.sureName}
              </h2>
              <img src={tempImage} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usrs: state.userRed.users,
  };
};

/* const mapDispatchToProps = dispatch =>{

} */

export default connect(mapStateToProps)(Map);
