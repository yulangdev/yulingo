import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import LearnWithKeyboard from './LearnWithKeyboard';
import LearnWithMouse from './LearnWithMouse';
import Record from './Record';
import Error from './Error';

const style = makeStyles((theme) => ({
  container: {
    padding: '0px',
  },
}));

function App() {
  const classes = style();
  const theme = createMuiTheme({
    typography: {
      fontFamily: 'Noto Sans KR',
    },
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#43a047',
      },
    },
  });
  
  return (
    <MuiThemeProvider theme={theme}>
      <Container maxWidth='xs' className={classes.container}>
        <BrowserRouter>
          <Switch>
            <Route component={Login}              path="/login" />
            <Route component={Registration}       path="/registration" />
            <Route component={Home}               path="/" exact />
            <Route component={LearnWithKeyboard}  path="/learnWithKeyboard" />
            <Route component={LearnWithMouse}     path="/learnWithMouse" />
            <Route component={LearnWithKeyboard}  path="/reviewWithKeyboard" />
            <Route component={LearnWithMouse}     path="/reviewWithMouse" />
            <Route component={Record}             path="/record" />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </Container>
    </MuiThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
