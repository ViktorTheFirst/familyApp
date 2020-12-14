import * as actionTypes from './const';
const youripadress = 'http://localhost:4000';

export const image_upload = (imageData) => {
  return async (dispatch, getState) => {
    try {
      console.log('IMAGE DATA: ', imageData);
      const id = getState().authRed.currUser.userID;
      const res = await fetch(
        `${youripadress}/api/v1/memories/image_upload/${id}`,
        {
          method: 'POST',
          body: imageData,
        }
      );
      const serverData = await res.json();

      return serverData.status;
    } catch (err) {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          notification: 'Error while uploading image to server',
          type: 'error',
        },
      });
    }
  };
};

//--------------------------------------------------------------------------------

export const add_memory = (incomingData) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().authRed.currUser.token;
      const { name, sureName } = getState().userRed.currUser;
      const { description, imageURL } = incomingData;
      const owner = name.concat(' ', sureName);
      const data = { description, imageURL, owner };

      const res = await fetch(`${youripadress}/api/v1/memories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(data),
      });

      const serverData = await res.json();
      if (serverData.status === 'success') {
        dispatch({
          type: actionTypes.ADD_MEMORY,
          payload: serverData,
        });
      }
    } catch (err) {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          notification: 'Error while uploading memory to server',
          type: 'error',
        },
      });
    }
  };
};
//--------------------------------------------------------------------------------
export const delete_memory = (id) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().authRed.currUser.token;
      const res = await fetch(`${youripadress}/api/v1/memories/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: token,
        },
      });
      const serverData = await res.json();
      //memory deletion success
      if (serverData.status === 'success') {
        dispatch({
          type: actionTypes.SHOW_NOTIFICATION,
          payload: {
            notification: `Memory of family member ${serverData.data.deletedMemory.owner} has been deleted`,
            type: 'success',
          },
        });
      }
      return serverData;
    } catch (err) {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          notification: 'Error while deleting memory',
          type: 'error',
        },
      });
    }
  };
};

//--------------------------------------------------------------------------------

export const memory_image_upload = (imageData) => {
  return async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${youripadress}/api/v1/memories/memory_image_upload`,
        {
          method: 'POST',
          body: imageData,
        }
      );
      const serverData = await res.json();

      return serverData.status;
    } catch (err) {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          notification: 'Error while uploading image to server',
          type: 'error',
        },
      });
    }
  };
};

//--------------------------------------------------------------------------------

export const get_all_memories = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().authRed.currUser.token;
      const res = await fetch(`${youripadress}/api/v1/memories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: token,
        },
      });
      const serverData = await res.json();

      if (serverData.status === 'success') {
        dispatch({
          type: actionTypes.GET_ALL_MEMORIES,
          payload: serverData,
        });
      } else {
        if (serverData.status === 'fail' && serverData.message)
          console.log(serverData.message);
      }
    } catch (err) {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          notification: 'Error fetching memories from server',
          type: 'error',
        },
      });
    }
  };
};
