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
import { persistAuthCheck } from './store/actions/authActions';
import { connect } from 'react-redux';
import { get_user } from './store/actions/userActions';

class App extends Component {
  constructor(props) {
    super(props);

    console.log('[App] Constructor');
    this.props.onPersistAuthCheck();
  }

  componentDidMount() {
    console.log('[App] - componentDidMount');
  }

  render() {
    console.log('[App] - render');
    if (this.props.currUser.userID) {
      this.props.onGetUser(this.props.currUser.userID);
    }
    return (
      <div className='App'>
        {this.props.currUser.userID && <Navbar />}

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
    onPersistAuthCheck: async () => await dispatch(persistAuthCheck()),
    onGetUser: async (userID) => await dispatch(get_user(userID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
