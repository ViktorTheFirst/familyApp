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

    console.log('[Home] Constructor');
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
    console.log('[Home] - render');

    return (
      <div>
        {/* REDIRECT TO REGISTRATION IF NO TOKEN FOUND */}
        {this.authRedirect}
        <section className='main-section'>
          <div className='main-background'>
            {/* <img className='main-image' src={homePhoto} alt='home photo' /> */}
          </div>
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
          <div className='memories-backgorund'>
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
