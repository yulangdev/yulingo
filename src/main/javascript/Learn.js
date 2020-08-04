import React from 'react';
import { useRef } from 'react';
import { Fragment } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import CheckIcon from '@material-ui/icons/Check';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CorrectIcon from '@material-ui/icons/SentimentVerySatisfied';
import IncorrectIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import TimeoverIcon from '@material-ui/icons/SentimentDissatisfied';

import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';

const styles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  dialogCloseButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
  wordbank: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  textfield: {
    width: '100%',
  },
  bar: {
    transitionDuration: 'none',
  },
  correctIcon: {
    color: green[500],
    fontSize: '3rem',
  },
  incorrectIcon: {
    color: red[500],
    fontSize: '3rem',
  },
  timeoverIcon: {
    color: orange[500],
    fontSize: '3rem',
  },
}));

export default function Learn(props) {
  const classes = styles();
  const userSentenceRef = useRef();
  const [progressStyle, setProgressStyle] = useState({});
  const [correctDialogVisible, setCorrectDialogVisible] = useState(false);
  const [incorrectDialogVisible, setIncorrectDialogVisible] = useState(false);
  const [timeoverDialogVisible, setTimeoverDialogVisible] = useState(false);
  const [sentenceId, setSentenceId] = useState(-1);
  const [koreanSentence, setKoreanSentence] = useState('');
  const [englishSentence, setEnglishSentence] = useState('');
  const [userSentence, setUserSentence] = useState('');  
  const [masterWordbank, setMasterWordbank] = useState([]);
  const [wordbank, setWordbank] = useState([]);
  const [timeover, setTimeover] = useState(true);
  const [isReview, setIsReview] = useState(props.location.pathname === '/review');

  useEffect(() => {
    requestNewSentence();
  }, []);

  const requestNewSentence = () => {
    const url = isReview ? '/api/review' : '/api/learn';
    fetch(url)
    .then(response => response.json())
    .then(data => {
      let koreanSentence = isReview ? data.sentence.koreanSentence : data.koreanSentence;
      let englishSentence = isReview ? data.sentence.englishSentence : data.englishSentence;
      let wordbank = normalize(englishSentence).split(' ').sort();
      setSentenceId(data.sentenceId);
      setKoreanSentence(koreanSentence);
      setEnglishSentence(englishSentence);
      setMasterWordbank(wordbank);
      initQuestion(wordbank);
    })
    .catch(error => {
      props.history.push("/");
    });
  }

  const initQuestion = wordbank => {
    let getStyle = () => ({
      width: '100%',
      height: '4px',
      backgroundColor: '#ffb74d',
      transitionTimingFunction: 'linear',
      transitionDuration: '0s',
    });
    setProgressStyle(getStyle());
    setTimeout(() => {
      let style = getStyle();
      style.width = '0%';
      style.transitionDuration = `${wordbank.length * 1.10}s`;
      setProgressStyle(style);
      setTimeover(false);
      setWordbank(wordbank);
      setUserSentence('');
      userSentenceRef.current.focus();
    }, 100);
  }

  const openCorrectDialog = () => {
    setCorrectDialogVisible(true);
  }

  const closeCorrectDialog = event => {
    if (event.type === 'keydown' && event.keyCode !== 13)
      return;
    setCorrectDialogVisible(false);
    fetch(`/api/record/${sentenceId}`)
    .then(response => response.json())
    .then(data => requestNewSentence());
  }

  const openIncorrectDialog = () => {
    setIncorrectDialogVisible(true);
  }

  const closeIncorrectDialog = event => {
    if (event.type === 'keydown' && event.keyCode !== 13)
      return;
    setIncorrectDialogVisible(false);
  }

  const openTimeoverDialog = () => {
    setTimeoverDialogVisible(true);
  }

  const closeTimeoverDialog = event => {
    if (event.type === 'keydown' && event.keyCode !== 13)
      return;
    setTimeoverDialogVisible(false);
    initQuestion(masterWordbank);
  }

  const normalize = sentence => {
    if (sentence === undefined) return '';
    return sentence.replace(/[,.?]/g, '').replace(/\s{2,}/, ' ').toLowerCase().trim();
  }

  const handleChange = event => {
    setUserSentence(event.target.value);
    let tempWordBank = masterWordbank.slice();
    let userWordBank = normalize(event.target.value).split(' ');
    for (let i = 0; i < userWordBank.length; i++) {
      let index = tempWordBank.indexOf(userWordBank[i]);
      if (index < 0) continue;      
      tempWordBank.splice(index, 1);
    }
    setWordbank(tempWordBank);
  }

  const handleCheck = event => {
    if (event.type === 'keydown' && event.keyCode !== 13)
      return;
    if (normalize(englishSentence) !== normalize(userSentence)) {
      openIncorrectDialog();
      return;
    }
    if (timeover === true) {
      openTimeoverDialog();
      return;
    }
    openCorrectDialog();
  }

  return (
    <Fragment>
      <AppBar position='static'>
        <Toolbar>
          <IconButton component={RouterLink} to='/' edge='start' color='inherit'>
            <ArrowBackIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6'>
            {isReview ? '복습하기' : '학습하기'}
          </Typography>
          <IconButton onClick={handleCheck} edge='end' color='inherit'>
            <CheckIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>{koreanSentence}</Typography>
          <Divider />
          <div style={progressStyle} onTransitionEnd={() => setTimeover(true)}></div>
          <Breadcrumbs className={classes.wordbank} maxItems={100}>
            {wordbank.map((word, index) => <Typography key={index} variant='body2' color='textSecondary'>{word}</Typography>)}
          </Breadcrumbs>
        </CardContent>
        <CardActions>
          <TextField inputRef={userSentenceRef} value={userSentence} onChange={handleChange} onKeyDown={handleCheck} className={classes.textfield} id='standard-basic' label='위 영어 단어들을 조합해 문장을 완성하세요.' />          
        </CardActions>
      </Card>

      <Dialog open={correctDialogVisible} onClose={closeCorrectDialog} onKeyDown={closeCorrectDialog} fullWidth>
        <ListItem>
          <ListItemIcon><CorrectIcon className={classes.correctIcon} /></ListItemIcon>
          <ListItemText primary='Correct' secondary='다음 문장으로 넘어갑니다.' />
        </ListItem>
        <Divider />
        <DialogActions>
          <Button onClick={closeCorrectDialog} color='primary' fullWidth>확인</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={incorrectDialogVisible} onClose={closeIncorrectDialog} onKeyDown={closeIncorrectDialog} fullWidth>
        <ListItem>
          <ListItemIcon><IncorrectIcon className={classes.incorrectIcon} /></ListItemIcon>
          <ListItemText primary='Incorrect' secondary='잘못된 문장입니다.' />
        </ListItem>
        <Divider />
        <DialogActions>
          <Button onClick={closeIncorrectDialog} color='primary' fullWidth>확인</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={timeoverDialogVisible} onClose={closeTimeoverDialog} onKeyDown={closeTimeoverDialog} fullWidth>
        <ListItem>
          <ListItemIcon><TimeoverIcon className={classes.timeoverIcon} /></ListItemIcon>
          <ListItemText primary='Timeout' secondary='제한시간이 초과되었습니다.' />
        </ListItem>
        <Divider />
        <DialogActions>
          <Button onClick={closeTimeoverDialog} color='primary' fullWidth>확인</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
