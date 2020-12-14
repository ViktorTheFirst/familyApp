import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/HomeContainer/Home';
import LiveFeed from './containers/LiveFeedContainer/LiveFeed';
import Memories from './containers/MemoriesContainer/Memories';
import Map from './containers/MapContainer/Map';
import Profile from './containers/ProfileContainer/Profile';
import Registration from './containers/RegistrationContainer/Registration';
import Login from './containers/LoginContainer/Login';
import Logout from './containers/LogoutContainer/Logout';
import Notification from '../src/components/Notification/Notification';
import { persistAuthCheck } from './store/actions/authActions';
import { connect } from 'react-redux';
import { get_user } from './store/actions/userActions';

class App extends Component {
  constructor(props) {
    super(props);

    //console.log('[App] Constructor');
    this.props.onPersistAuthCheck();
  }

  /* componentDidMount() {
    console.log('[App] - componentDidMount');
    this.props.onGetUser(this.props.ID);
  } */

  /* shouldComponentUpdate(prevProps){
    console.log('[App] - prevProps', prevProps);
    console.log('[App] - props', this.props);
    if (this.props.ID === prevProps.ID) {
      //this.props.onGetUser(this.props.ID);
      return false;
    }
    return true;
    
  } */

  render() {
    console.log('[App] - render');
    const { userID, name, sureName, profileImage } = this.props.currUser;
    if (this.props.ID && userID === null) {
      this.props.onGetUser(this.props.ID);
    }
    return (
      <div className='App'>
        {this.props.ID && (
          <Navbar name={name} sureName={sureName} profileImage={profileImage} />
        )}

        <Switch>
          <Route path='/live-feed' component={LiveFeed} />
          <Route path='/memories' component={Memories} />
          <Route path='/map' component={Map} />
          <Route path='/profile' component={Profile} />
          <Route path='/registration' component={Registration} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={Home} />
          <Route render={() => <h1>404: page not found</h1>} />
        </Switch>
        <Notification />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ID: state.authRed.currUser.userID,
    currUser: state.userRed.currUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPersistAuthCheck: async () => await dispatch(persistAuthCheck()),
    onGetUser: async (userID) => await dispatch(get_user(userID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
