import React, { Fragment, useState } from 'react';
import './TimeLineItem.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const TimeLineItem = (props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  //console.log('[TimeLineItem] - props: ', props);

  const parseDate = (date) => {
    //date:  2020-11-02T17:01:26.991+00:00
    const a = date.slice(0, 10); // "2020-11-02"
    const b = a.split('-'); // ["2020", "11", "02"]
    const c = b.reverse(); // ["02", "11", "2020" ]
    const d = c.join('-'); // "02-11-2020"
    return d;
  };

  const openImageHandler = () => {
    //do not open the image of last memory
    if (props.memory.imageURL === 'imgUpload.png') {
      return;
    }
    setShowDialog(true);
  };

  const closeImageHandler = () => {
    setShowDialog(false);
  };

  const actionHandler = (event) => {
    //counter intuitive when isAdmin true do return ??????
    if (props.isAdmin) {
      return;
    }
    if (props.dummy) {
      return;
    }
    //the menu opens on the element you clicked
    setAnchorEl(event.currentTarget);
  };

  const closeMenuHandler = () => {
    setAnchorEl(null);
  };

  return (
    <div className='item-container'>
      <Dialog
        open={showDialog}
        onClose={closeImageHandler}
        aria-labelledby='dialog-title'
        maxWidth='xl'
      >
        <DialogContent>
          <img
            src={props.memory.imageURL}
            style={{ height: '80vh', width: 'auto' }}
          />
        </DialogContent>
      </Dialog>
      <div className='item-content'>
        <img
          style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
          src={`/${props.memory.imageURL}`}
          onClick={openImageHandler}
        />

        <p className='description'>{props.memory.description}</p>
      </div>
      <Fragment>
        <span
          className='circle'
          onClick={actionHandler}
          style={{ cursor: 'pointer' }}
        >
          {parseDate(props.memory.date)}
        </span>
        <Menu
          id='memory-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          keepMounted
          onClose={closeMenuHandler}
        >
          <MenuItem onClick={() => props.delete(props.memory._id)}>
            Delete Memory
          </MenuItem>
          <MenuItem>Edit Memory</MenuItem>
          <MenuItem>Hide Memory</MenuItem>
        </Menu>
      </Fragment>
    </div>
  );
};

export default TimeLineItem;
