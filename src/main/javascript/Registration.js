import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(8),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(2, 0, 0, 0),
  },
  alert: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
  },
}));

export default function Login(props) {
  const classes = useStyles();

  const showAlert = search => {
    switch (search) {
      case '?duplicated':
        return (<Alert className={classes.alert} severity="warning">등록된 이메일입니다.</Alert>);
      default:
        return;
    }
  }

  return (
    <div>
      <Paper className={classes.paper}>
        {showAlert(props.location.search)}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Yulingo
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          영어 단어 예문 암기 시스템.
        </Typography>
        <form className={classes.form} method='post' action='/registration'>
          <TextField variant='outlined' margin='normal' name='username' label='이메일' required fullWidth autoFocus />
          <TextField variant='outlined' margin='normal' name='password' label='비밀번호' type='password' required fullWidth />
          <Button variant='contained' color='primary' size='large' className={classes.button} fullWidth disableElevation type='submit' >
            회원가입
          </Button>
          <Button variant='contained' color='default' size='large' className={classes.button} fullWidth disableElevation component={RouterLink} to='/login'>
            취소
          </Button>
        </form>
      </Paper>
      <Copyright />
    </div>
  );
}
