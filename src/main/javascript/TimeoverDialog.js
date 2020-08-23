import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TimeoverIcon from '@material-ui/icons/SentimentDissatisfied';
import orange from '@material-ui/core/colors/orange';

const styles = makeStyles((theme) => ({
  timeoverIcon: {
    color: orange[500],
    fontSize: '3rem',
  },
}));

export default function TimeoverDialog(props) {
  const classes = styles();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    props.onClosed();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <ListItem>
        <ListItemIcon><TimeoverIcon className={classes.timeoverIcon} /></ListItemIcon>
        <ListItemText primary='Timeout' secondary='제한시간이 초과되었습니다.' />
      </ListItem>
      <Divider />
      <DialogActions>
        <Button onClick={handleClose} color='primary' fullWidth>확인</Button>
      </DialogActions>
    </Dialog>
  );
}