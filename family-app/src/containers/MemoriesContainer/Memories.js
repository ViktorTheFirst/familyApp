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
import './Memories.css';

class Memories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      image: null,
      previewURL: null,
      description: '',
    };
    //console.log('[Memories] - Constructor');
    props.onGetAllMemories();
  }

  openDialogHandler() {
    this.setState({ showDialog: true });
  }

  closeDialogHandler() {
    this.setState({ showDialog: false, image: null, previewURL: null });
  }
  //this is a property of the class that holds a method
  fileChoiseHandler = (event) => {
    //console.log('--------------------', event.target.files[0]);
    this.setState({
      image: event.target.files[0],
      previewURL: URL.createObjectURL(event.target.files[0]),
    });
  };

  fileUploadHandler = () => {
    console.log('File sent to server');
    const fd = new FormData();
    fd.append('memory_image', this.state.image, this.state.image.name);
    this.props.onAddMemory(this.state.description, this.state.image.name);
    const response = this.props.onAddMemoryImage(fd);
    if (response === 'success') {
      this.setState({ showModal: false });
    }
  };

  descriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  render() {
    //console.log('[Memories] - render');
    return (
      <div className='mem-container'>
        <Dialog
          open={this.state.showDialog}
          onClose={this.closeDialogHandler.bind(this)}
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
                <Button onClick={() => this.fileInput.click()}>
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
              <div>
                <img src={this.state.previewURL} />
                <DialogContentText>Describe the memory</DialogContentText>
                <TextField
                  fullWidth={true}
                  value={this.state.description}
                  onChange={this.descriptionHandler}
                  placeholder='Memory Description'
                />
              </div>
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
              onClick={this.closeDialogHandler.bind(this)}
            >
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
        {!this.props.memories ? (
          <Spinner />
        ) : (
          <Fragment>
            <p>Amount of memories: {this.props.memCount}</p>
            <span>Memory 1: {this.props.memories[0].description}</span>
            <div className='add-memory-container'>
              <Button
                variant='contained'
                color='primary'
                onClick={this.openDialogHandler.bind(this)}
              >
                Add memory
              </Button>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateTOProps = (state) => {
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
  };
};

export default connect(mapStateTOProps, mapDispatchToProps)(Memories);
