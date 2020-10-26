import * as actionTypes from './const';
const youripadress = 'http://localhost:4000';

export const image_upload = (imageData) => {
  return async (dispatch, getState) => {
    const id = getState().authRed.currUser.userID;
    const res = await fetch(
      `${youripadress}/api/v1/memories/image_upload/${id}`,
      {
        method: 'POST',
        body: imageData,
      }
    );
    const serverData = await res.json();
    console.log('inside memoryActions image_upload:', serverData);
    return serverData.status;
  };
};
