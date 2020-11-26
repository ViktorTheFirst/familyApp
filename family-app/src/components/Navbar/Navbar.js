import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import './Navbar.css';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoginSection from './LoginSection/LoginSection';

const Navbar = (props) => {
  const [burgerToggle, setBurgerToggle] = useState(false);

  return (
    <Grid component='div' className='nav'>
      <nav>
        <Grid xs={4} sm={6} lg={8} component='ul' item className='nav-links'>
          <FaBars
            onClick={() => {
              setBurgerToggle(!burgerToggle);
            }}
            className='burger'
            color='white'
            size='20px'
          />
          <li>
            <Link to='/'>Home</Link>
          </li>

          <li>
            <Link to='/logout'>Logout</Link>
          </li>
        </Grid>
        <Grid
          xs={8}
          sm={6}
          lg={4}
          component='div'
          item
          className='login-section'
        >
          <LoginSection
            isAuthorized={props.profileImage}
            name={props.name}
            sureName={props.sureName}
            profileImage={props.profileImage}
          />
        </Grid>
      </nav>
    </Grid>
  );
};

export default Navbar;
