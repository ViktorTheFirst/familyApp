import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_user } from '../../store/actions/userActions';
import avatarPlaceholder from '..//../assets/avatar-placeholder.png';
import { image_upload } from '..//../store/actions/memoryActions';
import './Profile.css';

const Profile = (props) => {
  const [image, setImage] = useState(null);
  const [fileInput, setFileInput] = useState(null);
  const dispatch = useDispatch();

  const { userID, name, sureName, email, profileImage } = useSelector(
    (state) => state.userRed.currUser
  );
  const fileChoiseHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const fileUploadHandler = async () => {
    const fd = new FormData();
    fd.append('memory_image', image, image.name);
    const response = await dispatch(image_upload(fd));
    if (response === 'success') {
      await dispatch(get_user(userID));
    }
    setImage(null);
  };

  return (
    <div className='profile-container'>
      <div className='image-and-actions-container'>
        <div className='image-container'>
          <img src={`/${profileImage}`} />
        </div>
        <div className='actions-container'>
          {!image && (
            <button onClick={() => fileInput.click()}>change image</button>
          )}
          {image && <button onClick={fileUploadHandler}>UPLOAD</button>}
          <button>edit profile</button>
          <input
            type='file'
            onChange={fileChoiseHandler}
            accept='image/*'
            style={{ display: 'none' }}
            ref={(fileInput) => setFileInput(fileInput)}
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
          <p>{name}</p>
          <p>{sureName}</p>
          <p>{email}</p>
          <p>32</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
