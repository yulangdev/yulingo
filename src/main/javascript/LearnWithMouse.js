import React from 'react';
import { Fragment } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import CorrectDialog from './CorrectDialog';
import IncorrectDialog from './IncorrectDialog';
import TimeoverDialog from './TimeoverDialog';

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
    minHeight: theme.spacing(10),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    display: 'flex',
    alignContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
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

export default function LearnWithMouse(props) {
  const classes = styles();
  const [sentenceId, setSentenceId] = useState(-1);
  const [openCorrectDialog, setOpenCorrectDialog] = useState(false);
  const [openIncorrectDialog, setOpenIncorrectDialog] = useState(false);
  const [openTimeoverDialog, setOpenTimeoverDialog] = useState(false);
  const [koreanSentence, setKoreanSentence] = useState('');
  const [englishSentence, setEnglishSentence] = useState('');
  const [wordbank, setWordbank] = useState([]);
  const [userWordbank, setUserWordbank] = useState([]);
  const [progressStyle, setProgressStyle] = useState({});
  const [timeover, setTimeover] = useState(true);
  const [isReview, setIsReview] = useState(props.location.pathname.startsWith('/review'));

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
      englishSentence = englishSentence.replace(/[,.?]/g, '').replace(/\s{2,}/, ' ').toLowerCase().trim();
      setSentenceId(data.sentenceId);
      setKoreanSentence(koreanSentence);
      setEnglishSentence(englishSentence);
      initQuestion(englishSentence);
    })
    .catch(error => {
      console.log(error);
      props.history.push("/");
    });
  }

  const initQuestion = englishSentence => {
    setWordbank(englishSentence.split(' ').sort());
    setUserWordbank([]);
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
      style.transitionDuration = `${wordbank.length * 1.10 + 5}s`;
      setProgressStyle(style);
      setTimeover(false);
    }, 100);
  }

  const handleWordbank = key => {
    setUserWordbank([...userWordbank, wordbank[key]]);
    setWordbank(wordbank.filter((word, index) => index !== key));
  };

  const handleUserWordbank = key => {
    setWordbank([...wordbank, userWordbank[key]].sort());
    setUserWordbank(userWordbank.filter((word, index) => index !== key));
  };

  const handleTransitionEnd = () => {
    setTimeover(true);
  }

  const handleCheck = () => {
    let userEnglishSentence = userWordbank.join(' ');
    let result = englishSentence === userEnglishSentence;
    if (result == false) {
      setOpenIncorrectDialog(true);
      return;
    }
    if (timeover) {      
      setOpenTimeoverDialog(true);
      return;
    }
    setOpenCorrectDialog(true);
  };

  const handleCorrectDialogClosed = () => {
    console.log('handleCorrectDialogClosed');
    setOpenCorrectDialog(false);
    fetch(`/api/record/${sentenceId}`)
      .then(response => response.json())
      .then(data => requestNewSentence());
  };

  const handleIncorrectDialogClosed = () => {
    console.log('handleIncorrectDialogClosed');
    setOpenTimeoverDialog(false);
  };

  const handleTimeoverDialogClosed = () => {
    console.log('handleTimeoverDialogClosed');
    setOpenTimeoverDialog(false);
    initQuestion(englishSentence);
  };

  return (
    <Fragment>
      {openCorrectDialog ? <CorrectDialog onClosed={handleCorrectDialogClosed} /> : <div />}
      {openIncorrectDialog ? <IncorrectDialog onClosed={handleIncorrectDialogClosed} /> : <div />}
      {openTimeoverDialog ? <TimeoverDialog onClosed={handleTimeoverDialogClosed} /> : <div />}

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
          <div style={progressStyle} onTransitionEnd={handleTransitionEnd}></div>
          <div className={classes.wordbank}>
            {userWordbank.length === 0
              ? <Typography color='textSecondary'>다음 단어들을 조합해 문장을 완성하세요.</Typography>
              : userWordbank.map((word, index) => <Chip key={index} label={word} variant='outlined' color='secondary' onClick={handleUserWordbank.bind(null, index)} />)}
          </div>
          <Divider />
          <div className={classes.wordbank}>
            {wordbank.map((word, index) => <Chip key={index} label={word} variant='outlined' color='primary' onClick={handleWordbank.bind(null, index)} />)}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
}
