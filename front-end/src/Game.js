import React from 'react';
import { isMobile } from "react-device-detect";
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
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ErrorIcon from '@material-ui/icons/Error';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const col1 = ['🍎','🍌','🔁','7️⃣','🍒','🍇','🔁','🍎','🍌','🍊','🍌','🍒','🍎','🔁','🍇','7️⃣','🍎','🍌','🔁','🍇','🍊']
const col2 = ['🍎','🍎','🍌','🍊','🍌','🔁','🍒','🍇','🍌','🔁','🍒','🍌','🔁','🍒','7️⃣','🍒','🔁','🍌','🍇','🍒','🔁'] 
const col3 = ['🍎','🔁','🍌','🍒','7️⃣','🍎','🍊','🔁','🍌','🍇','🔁','🍌','🍎','🍇','🔁','🍌','🍇','🍎','🔁','🍌','🍇']
const linesLookup = {
	"top": [0, 1, 2],
	"middle": [3, 4, 5],
	"bottom": [6, 7, 8],
	"majorDiagonal": [0, 4, 8],
	"minorDiagonal": [6, 4, 2],
}

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
  game_paper_green: {
    position: "relative",
    backgroundColor: theme.palette.success.main,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    textAlign: 'center',
  },
  textField: {
    width: theme.spacing(25),
  },
  tooltipWidth: {
    maxWidth: 180
  },
  circularProgress: {
    position: "absolute",
    left: theme.spacing(1),
  },
  checkIcon: {
    position: 'absolute',
    right: theme.spacing(0),
    top: theme.spacing(0)
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

function EmojiDisplay({value, idx, phase, slowReelCounter}) {
  const classes = useStyles();
  let toRender;
  if(phase === 2) {
    toRender =
    <Typography className={(Math.floor(slowReelCounter/5)>=idx%3 ? classes.slideDownEaseOut : classes.slideDownInfinite)} component="h1" variant="h2">
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

function SlotDisplay({emojiDisplay, phase, slowReelCounter, gameResult}) {
  const classes = useStyles();
  var greenBoxes = new Set()
  if(gameResult) {
    const winningLines = gameResult[6]
    winningLines.forEach(ele => {
      const indexes = linesLookup[ele]
      indexes.forEach(i => greenBoxes.add(i))
    })
  }
  return(
    emojiDisplay.map((value, idx) => (
      <Grid item key={idx} xs={4} md={4} lg={4}>
        <Box boxShadow={3}>
          <Paper className={(greenBoxes.has(idx) && phase === 0 ? classes.game_paper_green : classes.game_paper)}>
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
            <EmojiDisplay value={value} idx={idx} phase={phase} slowReelCounter={slowReelCounter}/>
          </Paper>
        </Box>
      </Grid>
    ))
  )
}

function HelpTitle() {
  const help = [
    ['🍒❓❓', '2 Wei'], 
    ['🍒🍒❓', '4 Wei'], 
    ['🍒🍒🍒', '6 Wei'], 
    ['🍎🍎🍎', '3 Wei'], 
    ['🍌🍌🍌', '6 Wei'], 
    ['🍇🍇🍇', '12 Wei'], 
    ['🍊🍊🍊', '100 Wei'], 
    ['7️⃣7️⃣7️⃣', '300 Wei'], 
    ['🔁🔁🔁', 'Refund']
  ]
  return (
    <Box>
      <Grid container direction="row">
        {help.map(val => (
          <React.Fragment>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography>
                {val[0]}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography variant="caption">
                {val[1]}
              </Typography>
            </Grid>
          </React.Fragment>
        ))
        }
      </Grid>
    </Box>
  )
}

function Game({showGame, account, setValue, value, setPhase, playerBet, phase, colIdx, slowReelCounter, gameResult}) {
  const classes = useStyles();
  const col1Idx = colIdx[0];
  const col2Idx = colIdx[1];
  const col3Idx = colIdx[2];
  // I want to show them like it's a real reel in a casino, not just all random
  const emojiDisplay = [
    col1[col1Idx % col1.length],
    col2[col2Idx % col2.length],
    col3[col3Idx % col3.length],
    col1[(col1Idx+1) % col1.length],
    col2[(col2Idx+1) % col2.length],
    col3[(col3Idx+1) % col3.length],
    col1[(col1Idx+2) % col1.length],
    col2[(col2Idx+2) % col2.length],
    col3[(col3Idx+2) % col3.length],
  ]

  const [error, setError] = React.useState(false)
  const [helperText, setHelperText] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const handleChange = (e) => {
    let value;
    if(['1', '2', '3'].includes(e.target.value)) {
      value = "0x" + e.target.value;
      setError(false)
      setHelperText('')
      console.log("Value changed to " + value)
    } else {
      value = "";
      setError(true)
      setHelperText('Input should be 1, 2, or 3')
    }
    setValue(value);
  }

  const handleStart = (e) => {
    if(!account) {
      setError(true)
      setHelperText('Connect to MetaMask')
      return
    }
    if(!value) {
      setError(true)
      setHelperText('Input should be 1, 2, or 3')
      return
    }
    setPhase(e, 1);
    playerBet();
    setLoading(true);
  }


  if(!showGame) {
    return <span></span>
  }
  return (
    <Fade in={true} timeout={400}>
      <Box mt={10}>
        <Container maxWidth="sm">
          <Grid container justify="center" spacing={4}>
            <SlotDisplay emojiDisplay={emojiDisplay} phase={phase} slowReelCounter={slowReelCounter} gameResult={gameResult}/>
          </Grid>
        </Container>
        <Box mt={7} mr={3}>
          <Grid container justify="center" spacing={2}>
          < Grid item style={{position: "relative", top: 6}}>
              <Tooltip placement="top" arrow={true} title={<HelpTitle/>} classes={{tooltip: classes.tooltipWidth}}>
                <HelpOutlineIcon/>
              </Tooltip>
            </Grid>
            <Grid item style={{position: "relative"}} className={classes.textField}>
              <Tooltip placement="top" arrow={true} title={"1 Ether is equivalent to 1,000,000,000,000,000,000 (1e18) Wei "}>
                <TextField 
                  id="filled-basic" 
                  label="Wei" 
                  variant="outlined" 
                  size="small" 
                  required={true} 
                  error={error} 
                  helperText={helperText} 
                  onChange={handleChange}
                  defaultValue={value[2]}
                  disabled={((phase===0 || !loading) && account)
                    ? false
                    : true
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon/>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {error && <ErrorIcon color="error"/>}
                      </InputAdornment>
                    ),
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item>
              <Button disabled={phase !== 0 || isMobile} variant="contained" color="primary" onClick={(e) => handleStart(e)} endIcon={<SendIcon/>} >
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