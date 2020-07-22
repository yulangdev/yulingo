import React from 'react';
import { Fragment } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RefreshIcon from '@material-ui/icons/Refresh';
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Copyright from './Copyright';

const style = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function Record() {
  const classes = style();
  const [data, setData] = useState([]);
 
  const getPastTime = item => {
    return (item.pastMonths > 0 ? item.pastMonths + ' months' : 
              item.pastDays > 0 ? item.pastDays + ' days' :
                item.pastHours > 0 ? item.pastHours + ' hours' :
                  item.pastMinutes + ' mins') + ' ago';
  }

  useEffect(() => {
    fetch('/api/record/list')
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  return (
    <Fragment>
      <AppBar position='static'>
        <Toolbar>
          <IconButton component={RouterLink} to='/' edge='start' color='inherit'>
            <ArrowBackIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6'>
            학습기록
          </Typography>
          <IconButton component={RouterLink} to='/record' edge='end' color='inherit'>
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {
        data.map((item) =>
          <Accordion key={item.recordId}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Badge color='error' variant='dot' invisible={item.savingRate >= 60 ? true : false}>
                <Typography variant='subtitle2'>
                  {item.koreanSentence}
                </Typography>
              </Badge>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>
                {item.englishSentence}
              </Typography>
            </AccordionDetails>
            <AccordionActions>
              <Chip size='small' label={item.savingRate + '%'} />
              <Chip size='small' label={item.repeatTimes + ' times'} />
              <Chip size='small' label={getPastTime(item)} />
            </AccordionActions>
          </Accordion>
        )
      }
      <Copyright />
    </Fragment>
  );
}
