import React from 'react';
import './LoginSection.css';
import avatarPlaceholder from '..//..//../assets/avatar-placeholder.png';
import { useHistory } from 'react-router-dom';

const LoginSection = (props) => {
  const history = useHistory();
  return (
    <div className='login-section-container'>
      <div className='text-container'>
        {props.isAuthorized && (
          <div>
            <p className='text'>{props.sureName}</p>
            <p className='text'>{props.name}</p>
          </div>
        )}
        {!props.isAuthorized && <p>Login required</p>}
      </div>
      <div className='image-container'>
        <img
          src={`/${props.profileImage}`}
          onClick={() => {
            history.push('/Profile');
          }}
        />
      </div>
    </div>
  );
};

export default LoginSection;
