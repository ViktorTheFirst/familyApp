import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_all_users } from '..//../store/actions/userActions';
import { register } from '..//../store/actions/authActions';
import Spinner from '..//../components/Spinner/Spinner';
import './Registration.css';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sureName: '',
      email: '',
      password: '',
      re_password: '',
      users: null,
    };
    props.onGetAllUsers();
  }

  subbmitHandler = async () => {
    const regStatus = await this.props.onRegister(
      this.state.name,
      this.state.sureName,
      this.state.email,
      this.state.password
    );
    if (regStatus === 'success') {
      this.props.history.push('/');
    } else {
      console.log('REGISTRATION FAILED, DO VALIDATION');
    }
  };

  componentDidMount() {
    console.log('[Registration] - componentDidMount');
    this.setState({ ...this.state, users: this.props.usrs });
  }

  render() {
    return (
      <div className='reg-container'>
        {/* <div className='validation-container'></div> */}
        {this.props.isLoading ? (
          <Spinner />
        ) : (
          <form className='reg-form' autoComplete='off'>
            <h2>Register</h2>
            <input
              type='text'
              placeholder='Name'
              value={this.state.name}
              onChange={(event) => {
                this.setState({
                  ...this.state,
                  name: event.target.value,
                });
              }}
            />

            <input
              type='text'
              placeholder='Sure Name'
              value={this.state.sureName}
              onChange={(event) => {
                this.setState({
                  ...this.state,
                  sureName: event.target.value,
                });
              }}
            />
            <input
              type='email'
              placeholder='Email'
              value={this.state.email}
              onChange={(event) => {
                this.setState({
                  ...this.state,
                  email: event.target.value,
                });
              }}
            />
            <input
              type='password'
              placeholder='Password'
              value={this.state.password}
              onChange={(event) => {
                this.setState({
                  ...this.state,
                  password: event.target.value,
                });
              }}
            />
            <input
              type='password'
              placeholder='Repeat-Password'
              value={this.state.re_password}
              onChange={(event) => {
                this.setState({
                  ...this.state,
                  re_password: event.target.value,
                });
              }}
            />
            <button onClick={this.subbmitHandler}>Register</button>
            <p
              onClick={() => {
                this.props.history.push('/login');
              }}
            >
              Already Registered?
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
    usrs: state.userRed.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetAllUsers: async () => await dispatch(get_all_users()),
    onRegister: async (name, sureName, email, password) =>
      await dispatch(register({ name, sureName, email, password })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
