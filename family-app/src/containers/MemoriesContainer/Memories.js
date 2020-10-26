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
      fileInput: null,
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

  fileChoiseHandler() {}

  render() {
    //console.log('[Memories] - render');
    return (
      <div className='mem-container'>
        <Modal
          isOpen={this.state.showModal}
          className='modal'
          onRequestClose={this.closeModalHandler.bind(this)}
        >
          <input
            type='file'
            onChange={this.fileChoiseHandler.bind(this)}
            accept='image/*'
            style={{ display: 'none' }}
            /* ref={(fileInput) => this.setState({ fileInput })} */
          />
          <button onClick={() => this.state.fileInput.click()}>ADD</button>
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
    /* onAddMemory: async (description, imageURL, owner) =>
      await dispatch(addMemory({})), */
    onGetAllMemories: async () =>
      await dispatch(actionTypes.get_all_memories()),
  };
};

export default connect(mapStateTOProps, mapDispatchToProps)(Memories);
