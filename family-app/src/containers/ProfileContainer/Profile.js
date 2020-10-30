import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_user } from '../../store/actions/userActions';
import avatarPlaceholder from '..//../assets/avatar-placeholder.png';
import { image_upload } from '..//../store/actions/memoryActions';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      fileinput: null,
      previewURL: null,
    };
  }

  fileChoiseHandler = (event) => {
    this.setState({
      image: event.target.files[0],
      previewURL: URL.createObjectURL(event.target.files[0]),
    });
  };

  fileUploadHandler = async () => {
    const fd = new FormData();
    fd.append('memory_image', this.state.image, this.state.image.name);
    const response = await this.props.onImageUpload(fd);
    if (response === 'success') {
      this.props.onGetUser(this.props.userID);
    }
    this.setState({ image: null, previewURL: null });
  };

  render() {
    return (
      <div className='profile-container'>
        <div className='image-and-actions-container'>
          <div className='image-container'>
            {!this.state.previewURL ? null : (
              <img src={this.state.previewURL} />
            )}
            {this.state.previewURL ? null : (
              <img src={`/${this.props.profileImage}`} />
            )}
          </div>
          <div className='actions-container'>
            {!this.state.image && (
              <button onClick={() => this.fileInput.click()}>
                Change image
              </button>
            )}
            {this.state.image && (
              <button onClick={this.fileUploadHandler}>UPLOAD</button>
            )}
            <button>Edit profile</button>
            <input
              type='file'
              onChange={this.fileChoiseHandler}
              accept='image/*'
              style={{ display: 'none' }}
              //store ref of this element in this.fileInput
              ref={(fInput) => (this.fileInput = fInput)}
            />
          </div>
        </div>
        <div className='info-container'>
          <div className='labels'>
            <label>Name:</label>
            <label>Sure Name:</label>
            <label>Email:</label>
            <label>Age:</label>
          </div>
          <div className='info'>
            <p>{this.props.name}</p>
            <p>{this.props.sureName}</p>
            <p>{this.props.email}</p>
            <p>32</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    userID,
    name,
    sureName,
    email,
    profileImage,
  } = state.userRed.currUser;
  return {
    userID,
    name,
    sureName,
    email,
    profileImage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onImageUpload: async (fd) => await dispatch(image_upload(fd)),
    onGetUser: async (userID) => await dispatch(get_user(userID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
