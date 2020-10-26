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

//--------------------------------------------------------------------------------

export const add_memory = (data) => {
  return async (getState) => {
    try {
      const token = getState().authRed.currUser.token;
      const res = await fetch(`${youripadress}/api/v1/memories)`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        //TODO: continue
      }
    } catch (err) {
      console.log(err);
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
      console.log(err);
    }
  };
};
