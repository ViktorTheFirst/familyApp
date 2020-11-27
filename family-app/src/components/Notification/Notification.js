import React from 'react';
import { connect } from 'react-redux';
//import { deleteMessage } from '../../../redux/notificationActions';
//import { Snackbar, Badge } from '@material-ui/core';
//import Alert from '@material-ui/lab/Alert';

class Notification extends React.Component {
  /* closeHandler = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.onDeleteMessage();
  }; */

  render() {
    /* const arrLen = this.props.messages.length;
    console.log('this.props.messages: ', this.props.messages); */
    return (
      <div>
        {/* {!arrLen ? null : (
          <Snackbar open={true} onClose={this.closeHandler}>
            <Badge badgeContent={arrLen} color='primary'>
              <Alert
                elevation={6}
                variant='filled'
                severity={this.props.messages[arrLen - 1].type}
                onClose={this.closeHandler}
              >
                {this.props.messages[arrLen - 1].message}
              </Alert>
            </Badge>
          </Snackbar>
        )} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteMessage: () => dispatch(deleteMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
