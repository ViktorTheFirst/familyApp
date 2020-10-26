import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Navbar.css';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoginSection from './LoginSection/LoginSection';

const Navbar = (props) => {
  const [burgerToggle, setBurgerToggle] = useState(false);
  const { token } = useSelector((state) => state.authRed.currUser);
  const { name, sureName, email, userID, profileImage } = useSelector(
    (state) => state.userRed.currUser
  );

  return (
    <div className='nav'>
      <nav>
        <ul
          className='nav-links'
          style={{
            transform: burgerToggle ? 'translateX(0px)' : '',
          }}
        >
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/live-feed'>Live Feed</Link>
          </li>
          {!token && (
            <li>
              <Link to='/registration'>Registration</Link>
            </li>
          )}
          {token && (
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          )}
        </ul>
        <div className='login-section'>
          {token && (
            <LoginSection
              isAuthorized={token}
              name={name}
              sureName={sureName}
              profileImage={profileImage}
            />
          )}
        </div>

        <FaBars
          onClick={() => {
            setBurgerToggle(!burgerToggle);
          }}
          className='burger'
          color='white'
          size='20px'
        />
      </nav>
    </div>
  );
};

export default Navbar;
