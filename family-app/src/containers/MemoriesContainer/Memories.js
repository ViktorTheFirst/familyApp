import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '..//../store/actions/memoryActions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spinner from '..//../components/Spinner/Spinner';
import TimeLine from '..//../components/TimeLine/TimeLine';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { showNotification } from '../../store/actions/notificationActions';

import './Memories.css';

class Memories extends Component {
  constructor(props) {
    super(props);
    //this.dialogRef = React.createRef();
    this.state = {
      showDialog: false,
      image: null,
      previewURL: null,
      description: '',
    };
    //console.log('[Memories] - Constructor');
    props.onGetAllMemories();
  }

  openDialogHandler = () => {
    this.setState({ showDialog: true });
  };

  closeDialogHandler = () => {
    this.setState({ showDialog: false, image: null, previewURL: null });
  };
  //this is a property of the class that holds a method
  fileChoiseHandler = (event) => {
    this.setState({
      image: event.target.files[0],
      previewURL: URL.createObjectURL(event.target.files[0]),
    });
  };

  fileUploadHandler = async () => {
    const fd = new FormData();
    fd.append('memory_image', this.state.image, this.state.image.name);
    this.props.onAddMemory(this.state.description, this.state.image.name);
    const response = await this.props.onAddMemoryImage(fd);
    if (response === 'success') {
      this.props.onShowNotification(
        'Your memory was uploaded successfuly',
        'success'
      );
      this.setState({
        previewURL: null,
        showDialog: false,
        description: '',
        image: null,
      });
    }
  };

  descriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  deleteMemory = (id) => {
    console.log('deleteMemory in Memories activated', id);
    const result = this.props.onDeleteMemory(id);
    if (result) {
      //update the list of memories after deletion
      this.props.onGetAllMemories();
    }
  };

  render() {
    //console.log('[Memories] - render');
    return (
      <div className='mem-container'>
        <Dialog
          //ref={this.dialogRef}
          open={this.state.showDialog}
          onClose={this.closeDialogHandler}
          aria-labelledby='dialog-title'
          maxWidth='xl'
        >
          <DialogTitle
            color='primary'
            style={{ textAlign: 'center' }}
            id='dialog-title'
          >
            Please add a photo to remember
          </DialogTitle>
          <DialogContent>
            {!this.state.image ? (
              <Fragment>
                <Button
                  color='primary'
                  variant='contained'
                  startIcon={<CloudUploadIcon />}
                  onClick={() => this.fileInput.click()}
                >
                  Upload Image
                </Button>
                <input
                  type='file'
                  style={{ display: 'none' }}
                  onChange={this.fileChoiseHandler}
                  accept='image/*'
                  ref={(fInput) => (this.fileInput = fInput)}
                />
              </Fragment>
            ) : (
              <Fragment>
                <img
                  src={this.state.previewURL}
                  style={{ height: '50vh', width: 'auto' }}
                />
                <DialogContentText>Describe the memory</DialogContentText>
                <TextField
                  fullWidth={true}
                  value={this.state.description}
                  onChange={this.descriptionHandler}
                  placeholder='Memory Description'
                />
              </Fragment>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              color='primary'
              disabled={
                this.state.image === null || this.state.description.length < 5
              }
              onClick={this.fileUploadHandler}
            >
              ADD
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={this.closeDialogHandler}
            >
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
        {!this.props.memories ? (
          <Spinner />
        ) : (
          <div className='timeline'>
            <TimeLine
              memories={this.props.memories}
              count={this.props.memCount}
              select={this.openDialogHandler}
              delete={this.deleteMemory} //activated by child
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    memories: state.memoriesRed.memories,
    memCount: state.memoriesRed.memCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddMemory: async (description, imageURL) =>
      await dispatch(actionTypes.add_memory({ description, imageURL })),
    onAddMemoryImage: async (fd) =>
      await dispatch(actionTypes.memory_image_upload(fd)),
    onGetAllMemories: async () =>
      await dispatch(actionTypes.get_all_memories()),
    onShowNotification: (notification, type) =>
      dispatch(showNotification(notification, type)),
    onDeleteMemory: async (id) => await dispatch(actionTypes.delete_memory(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Memories);
