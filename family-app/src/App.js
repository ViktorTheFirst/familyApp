import React, { useEffect, useRef } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { get_user } from './store/actions/userActions';

const App = (props) => {
  console.log('APP COMPONENT RE-RENDERED');
  const dispatch = useDispatch();
  //check if the user already was registered in the past
  const ref = useRef(false);
  if (!ref.current) {
    // Do something that you only want to do once...
    dispatch(persistAuthCheck());

    ref.current = true;
  }
  const { token, userID } = useSelector((state) => state.authRed.currUser);

  const preLoad = async () => {
    console.log('APP COMPONENT EFFECT ACTIVATED');
    await dispatch(get_user(userID));
  };

  useEffect(() => {
    if (userID) {
      preLoad();
    }
  }, [token]);

  return (
    <div className='App'>
      {token && <Navbar />}

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
};

export default App;
