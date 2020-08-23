import React from 'react';
import { Fragment } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PersonIcon from '@material-ui/icons/Person';

import Copyright from './Copyright';

const style = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  card: {
    margin: theme.spacing(2, 0),
  },
}));

export default function Home() {
  const classes = style();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('/api/statistic')
      .then(response => response.json())
      .then(json => setData(json));
  }, []);
  return (
    <Fragment>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit'>
            <PersonIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6'>
            {data.username}
          </Typography>
          <IconButton href='/logout' edge='end' color='inherit'>
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {data.learn} 개의 학습할 예문이 있습니다.
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            학습한 예문은 시간이 지남에 따라 잊어버렸을 확률이 점점 올라가며,
            망각률이 40% 이상이 되면 복습할 예문으로 등록됩니다.
            모든 예문을 학습해서 복습할 예문으로 등록하세요.
          </Typography>
        </CardContent>
        <CardActions>
          <ButtonGroup variant='outlined' color='primary' disableElevation fullWidth>
            <Button href={data.learn === 0 ? '' : '/learnWithKeyboard'}>키보드로 학습</Button>
            <Button href={data.learn === 0 ? '' : '/learnWithMouse'}>마우스로 학습</Button>
          </ButtonGroup>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {data.review === 0 ? "복습할 예문이 없습니다." : data.review + " 개의 복습할 예문이 있습니다."}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            암기한 예문들 중 잊어버렸을 확률이 40% 이상인 예문들을 복습합니다.
            복습한 횟수는 예문별로 기록되며, 반복을 많이 한 예문일수록 망각률이 천천히 내려갑니다.
            모든 예문의 망각률이 40% 이하가 되도록 유지하세요.
          </Typography>
        </CardContent>
        <CardActions>
          <ButtonGroup variant='outlined' color='primary' disableElevation fullWidth>
            <Button href={data.review === 0 ? '' : '/reviewWithKeyboard'}>키보드로 복습</Button>
            <Button href={data.review === 0 ? '' : '/reviewWithMouse'}>마우스로 복습</Button>
          </ButtonGroup>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {data.record === 0 ? "학습 기록이 없습니다." : data.record + " 개의 예문을 학습했습니다."}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            지금까지 학습한 예문들을 볼 수 있습니다.
            각 한국어 문장을 선택하면, 해당 문장의 영어 문장과 기억률, 반복 횟수, 최근 학습시간을 볼 수 있습니다.
            한국어 문장을 보고 암기한 영어 문장을 떠올려보세요.
          </Typography>
        </CardContent>
        <CardActions>
          <ButtonGroup variant='outlined' color='primary' disableElevation fullWidth>
            <Button href={data.record === 0 ? '' : '/record'}>학습기록</Button>
          </ButtonGroup>
        </CardActions>
      </Card>
      <Copyright />
    </Fragment>
  );
}
