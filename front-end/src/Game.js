import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ThemeProvider } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Chip from '@material-ui/core/Chip';
import SendIcon from '@material-ui/icons/Send';
import green from "@material-ui/core/colors/green";
import makeStyles from '@material-ui/core/styles/makeStyles';

const col1 = ['🍎','🍌','🔁','7️⃣','🍒','🍇','🔁','🍎','🍌','🍊','🍌','🍒','🍎','🔁','🍇','7️⃣','🍎','🍌','🔁','🍇','🍊']
const col2 = ['🍎','🍎','🍌','🍊','🍌','🍊','🍒','🍇','🍌','🔁','🍒','🍌','🔁','🍒','7️⃣','🍒','🔁','🍌','🍇','🍒','🔁'] 
const col3 = ['🍎','🔁','🍌','🍒','7️⃣','🍎','🍊','🔁','🍌','🍇','🔁','🍌','🍎','🍇','🔁','🍌','🍇','🍎','🔁','🍌','🍇']

const greenTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: green[500]},
  },
});


const useStyles = makeStyles((theme) => ({
  game_paper: {
    position: "relative",
    backgroundColor: theme.palette.grey[900],
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    textAlign: 'center',
  },
  circularProgress: {
    position: "absolute",
    left: theme.spacing(1),
  },
  rowIndicSide: {
    position: 'absolute',
    left: theme.spacing(-2),
    bottom: theme.spacing(7),
  },
  rowIndicDiagTop: {
    position: 'absolute',
    left: theme.spacing(-2),
    bottom: theme.spacing(7),
    top: theme.spacing(-2),
  },
  rowIndicDiagBot: {
    position: 'absolute',
    left: theme.spacing(-2),
    bottom: theme.spacing(7),
    top: theme.spacing(17),
  },
  '@keyframes slideDownAnimation': {
    '0%': {
      transform: 'translateY(-100%)',
    },
    '100%': {
      transform: 'translateY(100%)',
    },
  },
  slideDownInfinite: {
    animation: `$slideDownAnimation 100ms infinite linear`
  },
  '@keyframes slideDownHalfAnimation': {
    '0%': {
      transform: 'translateY(-100%)',
    },
    '100%': {
      transform: 'translateY(0%)',
    },
  },
  slideDownEaseOut: {
    animation: `$slideDownHalfAnimation 500ms ease-out`
  },
}));

function EmojiDisplay({value, idx, phase, slowReelCol}) {
  const classes = useStyles();
  let toRender;
  if(phase === 2) {
    toRender =
    <Typography className={(slowReelCol>=idx%3 ? classes.slideDownEaseOut : classes.slideDownInfinite)} component="h1" variant="h2">
      {value}
    </Typography>
  } else {
    toRender = 
      <Typography className={(phase === 1 ? classes.slideDownInfinite : '')} component="h1" variant="h2">
        {value}
      </Typography>
  }
  return (
    toRender
  )
}

function SlotDisplay({emojiDisplay, phase, slowReelCol}) {
  const classes = useStyles();
  return(
    emojiDisplay.map((value, idx) => (
      <Grid item key={idx} xs={4} md={4} lg={4}>
        <Box boxShadow={3}>
          <Paper className={classes.game_paper}>
            {/* 1, 2, 3 indicators spawn */}
            {idx === 0 &&
              <span>
                <Chip className={classes.rowIndicSide} label="2" color="primary"/>
                <ThemeProvider theme={greenTheme}>
                  <Chip className={classes.rowIndicDiagTop} label="3" color="primary"/>
                </ThemeProvider>
              </span>
            }
            {idx === 3 &&
              <Chip className={classes.rowIndicSide} label="1" color="secondary"/>
            }
            {idx === 6 &&
              <span>
                <Chip className={classes.rowIndicSide} label="2" color="primary"/>
                <ThemeProvider theme={greenTheme}>
                  <Chip className={classes.rowIndicDiagBot} label="3" color="primary"/>
                </ThemeProvider>
              </span>
            }
            {/* Emoji spawn */}
            <EmojiDisplay value={value} idx={idx} phase={phase} slowReelCol={slowReelCol}/>
          </Paper>
        </Box>
      </Grid>
    ))
  )
}

function Game({showGame, hasMetaMask, setPhase, sendTransaction, phase, colIdx, slowReelCol}) {
  const classes = useStyles();
  const col1Idx = colIdx[0];
  const col2Idx = colIdx[1];
  const col3Idx = colIdx[2];
  // I want to show them like it's a real reel in a casino, not just all random
  const emojiDisplay = [
    col1[(col1Idx+2) % col1.length],
    col2[(col2Idx+2) % col2.length],
    col3[(col3Idx+2) % col3.length],
    col1[(col1Idx+1) % col1.length],
    col2[(col2Idx+1) % col2.length],
    col3[(col3Idx+1) % col3.length],
    col1[col1Idx % col1.length],
    col2[col2Idx % col2.length],
    col3[col3Idx % col3.length],
  ]
  const handleStart = (e) => {
    if(!hasMetaMask)
      return
    setPhase(e, 1);
    sendTransaction();
  }

  if(!showGame) {
    return <span></span>
  }
  return (
    <Fade in={true} timeout={400}>
      <Box mt={10}>
        <Container maxWidth="sm">
          <Grid container justify="center" spacing={4}>
            <SlotDisplay emojiDisplay={emojiDisplay} phase={phase} slowReelCol={slowReelCol}/>
          </Grid>
        </Container>
        <Box mt={7} mr={3}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Button disabled={phase !== 0} variant="contained" color="primary" onClick={(e) => handleStart(e)} endIcon={<SendIcon/>} >
                Start 
              </Button>
            </Grid>
              <Grid item style={{position: "relative"}}>
              {phase === 1
                ?<CircularProgress className={classes.circularProgress}/>
                : <span></span>
              }
              </Grid>
          </Grid>
        </Box>
      </Box>
    </Fade>
  )
}

export default Game;