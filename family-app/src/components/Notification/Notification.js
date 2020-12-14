import React from 'react';
import { connect } from 'react-redux';
import {
  showNotification,
  deleteNotification,
} from '../../store/actions/notificationActions';
import { Snackbar, Badge } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

class Notification extends React.Component {
  closeHandler = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.onDeleteNotification();
  };

  render() {
    const arrLen = this.props.notifications.length;
    console.log('this.props.notifications: ', this.props.notifications);
    return (
      <div>
        {!arrLen ? null : (
          <Snackbar open={true} onClose={this.closeHandler}>
            <Badge badgeContent={arrLen} color='primary'>
              <Alert
                elevation={6}
                variant='filled'
                severity={this.props.notifications[arrLen - 1].type}
                onClose={this.closeHandler}
              >
                {this.props.notifications[arrLen - 1].notification}
              </Alert>
            </Badge>
          </Snackbar>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notificationRed.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteNotification: () => dispatch(deleteNotification()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
