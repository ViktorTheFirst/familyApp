import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import homePhoto from '..//../assets/main_edited.jpg';
import cribImage from '..//../assets/crib.png';
import dialogImage from '..//../assets/dialogBubbles.jpg';
import globeImage from '..//../assets/globe2.png';
import { get_all_users } from '..//../store/actions/userActions';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    const { token, userID } = props.currUser;
    this.authRedirect = null;
    if (!token) {
      this.authRedirect = <Redirect to='/registration' />;
    }
  }

  componentDidMount() {
    console.log('[Home] - componentDidMount');
    this.props.onGetAllUsers();
  }

  render() {
    return (
      <div>
        {/* REDIRECT TO REGISTRATION IF NO TOKEN FOUND */}
        {this.authRedirect}
        <section className='main-section'>
          <div className='main-background'>
            {/* <img className='main-image' src={homePhoto} alt='home photo' /> */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1440 320'
              className='wave'
            >
              <path
                fill='rgb(238, 250, 215)'
                fillOpacity='1'
                d='M0,64L40,69.3C80,75,160,85,240,117.3C320,149,400,203,480,218.7C560,235,640,213,720,186.7C800,160,880,128,960,112C1040,96,1120,96,1200,117.3C1280,139,1360,181,1400,202.7L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z'
              ></path>
            </svg>
          </div>
        </section>
        {/* ---------------------------------------------------------------- */}
        <section className='live-feed-section'>
          <div className='live-feed-background'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1440 320'
              className='live-feed-wave'
            >
              <path
                fill='rgb(238, 250, 215)'
                fillOpacity='1'
                d='M0,96L26.7,122.7C53.3,149,107,203,160,197.3C213.3,192,267,128,320,138.7C373.3,149,427,235,480,256C533.3,277,587,235,640,192C693.3,149,747,107,800,96C853.3,85,907,107,960,122.7C1013.3,139,1067,149,1120,138.7C1173.3,128,1227,96,1280,117.3C1333.3,139,1387,213,1413,250.7L1440,288L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z'
              ></path>
            </svg>
            <img
              className='crib-image'
              src={cribImage}
              onClick={() => {
                this.props.history.push('/live-feed');
              }}
            />
          </div>
        </section>
        {/* ---------------------------------------------------------------- */}
        <section className='memories-section'>
          <div className='memories-backgorund'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
              <path
                fill='pink'
                fillOpacity='1'
                d='M0,192L26.7,186.7C53.3,181,107,171,160,160C213.3,149,267,139,320,154.7C373.3,171,427,213,480,208C533.3,203,587,149,640,138.7C693.3,128,747,160,800,181.3C853.3,203,907,213,960,213.3C1013.3,213,1067,203,1120,218.7C1173.3,235,1227,277,1280,277.3C1333.3,277,1387,235,1413,213.3L1440,192L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z'
              ></path>
            </svg>
            <img
              className='crib-image'
              src={dialogImage}
              onClick={() => {
                this.props.history.push('/memories');
              }}
            />
          </div>
        </section>
        {/* ---------------------------------------------------------------- */}
        <section className='map-section'>
          <img
            className='crib-image'
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
