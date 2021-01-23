import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BG1 from '..//../assets/BG1_resized.jpg';
import BG2 from '..//../assets/BG2_resized.jpg';
import BG3 from '..//../assets/BG3_resized.jpg';
import BG4 from '..//../assets/BG4_resized.jpg';
import cribImage from '..//../assets/crib.png';
import dialogImage from '..//../assets/dialogBubbles.jpg';
import globeImage from '..//../assets/globe2.png';
import { get_all_users } from '..//../store/actions/userActions';
import Slider from '../../components/Slider/Slider';
import Slide from '../../components/Slider/Slide';

import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    //TODO: getAllBGImages();
    console.log('[Home] Constructor');
    const { token, userID } = props.currUser;
    this.authRedirect = null;
    if (!token) {
      this.authRedirect = <Redirect to='/registration' />;
    }
    this.memoriesImageRef = React.createRef();
  }

  sliderArr = [
    <Slide imageURL={BG1} />,
    <Slide imageURL={BG2} />,
    <Slide imageURL={BG3} />,
    <Slide imageURL={BG4} />,
  ];

  componentDidMount() {
    console.log('[Home] - componentDidMount');
    this.props.onGetAllUsers();
    /* TODO: build Particles component and import to Home.js
    youtube tutorial:  https://www.youtube.com/watch?v=nrJh8-Ixnu8&t=339s&ab_channel=Frankslaboratory
    
    this.ctx = this.memoriesImageRef.current.getContext('2d');
    
    class Particle{
      constructor()
    } */
  }

  render() {
    console.log('[Home] - render');

    return (
      <div>
        {/* REDIRECT TO REGISTRATION IF NO TOKEN FOUND */}
        {this.authRedirect}
        <section className='main-section'>
          <Slider sliderArr={this.sliderArr} autoPlay={8} />
        </section>
        {/* ---------------------------------------------------------------------------------------- */}
        <section className='live-feed-section'>
          <img
            className='crib-image'
            src={cribImage}
            onClick={() => {
              this.props.history.push('/live-feed');
            }}
          />
        </section>
        {/* ---------------------------------------------------------------- */}
        <section className='memories-section'>
          {/* TODO: replace img with Particles component */}
          <img
            className='section-image'
            src={dialogImage}
            onClick={() => {
              this.props.history.push('/memories');
            }}
          />
          <canvas ref={this.memoriesImageRef}></canvas>
        </section>
        {/* ---------------------------------------------------------------- */}
        <section className='map-section'>
          <img
            className='section-image'
            src={globeImage}
            onClick={() => {
              this.props.history.push('/map');
            }}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currUser: state.authRed.currUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAllUsers: async () => await dispatch(get_all_users()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
