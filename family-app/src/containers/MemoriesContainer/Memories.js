import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '..//../store/actions/memoryActions';
import Spinner from '..//../components/Spinner/Spinner';
import './Memories.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); //for modal accessability

class Memories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      image: null,
      previewURL: null,
      description: '',
    };
    //console.log('[Memories] - Constructor');
    props.onGetAllMemories();
  }

  openModalHandler() {
    this.setState({ showModal: true });
  }

  closeModalHandler() {
    this.setState({ showModal: false });
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
        <Modal
          isOpen={this.state.showModal}
          className='modal'
          onRequestClose={this.closeModalHandler.bind(this)}
        >
          <h1>Add memory</h1>
          {!this.state.image ? (
            <input
              type='file'
              onChange={this.fileChoiseHandler}
              accept='image/*'
            />
          ) : (
            <div>
              <img src={this.state.previewURL} />
              <h2>Describe the memory</h2>
              <input
                type='textarea'
                value={this.state.description}
                onChange={this.descriptionHandler}
                placeholder='Memory Description'
              />
              <button onClick={this.fileUploadHandler}>ADD</button>
            </div>
          )}
        </Modal>
        {!this.props.memories ? (
          <Spinner />
        ) : (
          <div>
            <p>Amount of memories: {this.props.memCount}</p>
            <span>Memory 1: {this.props.memories[0].description}</span>
            <div className='add-memory-container'>
              <button onClick={this.openModalHandler.bind(this)}>
                Add memory
              </button>
            </div>
          </div>
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
