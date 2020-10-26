import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '..//../store/actions/authActions';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, []);

  return <Redirect to='/login' />;
};

export default Logout;
