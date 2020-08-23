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
import IncorrectIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import red from '@material-ui/core/colors/red';

const styles = makeStyles((theme) => ({
  incorrectIcon: {
    color: red[500],
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
        <ListItemIcon><IncorrectIcon className={classes.incorrectIcon} /></ListItemIcon>
        <ListItemText primary='Incorrect' secondary='잘못된 문장입니다.' />
      </ListItem>
      <Divider />
      <DialogActions>
        <Button onClick={handleClose} color='primary' fullWidth>확인</Button>
      </DialogActions>
    </Dialog>
  );
}