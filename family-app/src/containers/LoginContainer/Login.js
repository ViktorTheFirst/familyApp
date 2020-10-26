import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '..//../store/actions/authActions';
import Spinner from '..//../components/Spinner/Spinner';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  subbmitHandler = async () => {
    //console.log('Login pressed');
    const loginStatus = await this.props.onLogin(
      this.state.email,
      this.state.password
    );

    if (loginStatus === 'success') {
      this.props.history.push('/');
    }
  };

  componentDidMount() {
    console.log('[Login] - componentDidMount');
  }

  render() {
    return (
      <div className='login-container'>
        {this.props.isLoading ? (
          <Spinner />
        ) : (
          <form className='log-form' autoComplete='off'>
            <h2>Login</h2>
            <input
              type='email'
              placeholder='Email'
              value={this.state.email}
              onChange={(event) => {
                this.setState({
                  email: event.target.value,
                  password: this.state.password,
                });
              }}
            />

            <input
              type='password'
              placeholder='Password'
              value={this.state.password}
              onChange={(event) => {
                this.setState({
                  email: this.state.email,
                  password: event.target.value,
                });
              }}
            />
            <button onClick={this.subbmitHandler}>Login</button>
            <p
              onClick={() => {
                this.props.history.push('/registration');
              }}
            >
              Don't have account?
            </p>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.authRed.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: async (email, password) =>
      await dispatch(login({ email, password })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
