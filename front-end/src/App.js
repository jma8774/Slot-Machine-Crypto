import 'fontsource-roboto';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { ThemeProvider } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from '@material-ui/core/styles/makeStyles';
import { MobileView } from "react-device-detect";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GitHubIcon from '@material-ui/icons/GitHub';
import Tooltip from '@material-ui/core/Tooltip';
// Custom Components
import Introduction from './Introduction';
import Instruction from './Instruction';
import Game from './Game';
import Stats from './Stats';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

// 🍎 = Pikachu
// 🍌 = Lotad
// 🔁 = Replay
// 7️⃣ = Red 7
// 🍊 = Refund (Blue 7)
// 🍒 = Cherry
// 🍇 = Marill]
const emojis = ['🍎','🍌','🔁','7️⃣','🍊','🍒','🍇']
const col1 = ['🍎','🍌','🔁','7️⃣','🍒','🍇','🔁','🍎','🍌','🍊','🍌','🍒','🍎','🔁','🍇','7️⃣','🍎','🍌','🔁','🍇','🍊']
const col2 = ['🍎','🍎','🍌','🍊','🍌','🍊','🍒','🍇','🍌','🔁','🍒','🍌','🔁','🍒','7️⃣','🍒','🔁','🍌','🍇','🍒','🔁'] 
const col3 = ['🍎','🔁','🍌','🍒','7️⃣','🍎','🍊','🔁','🍌','🍇','🔁','🍌','🍎','🍇','🔁','🍌','🍇','🍎','🔁','🍌','🍇']

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  github_btn: {
    marginTop: theme.spacing(2),
  },
  align_icon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  }
}));

// Web3 init
const Web3 = require('web3')
const rpcURL = 'https://kovan.infura.io/v3/a72c7e61b8fb4a978c526d28c9aa2b7c'
const web3 = new Web3(rpcURL)
// Metamask Pop-up (Connect Account?)
const ethEnabled = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    return true;
  }
  return false;
}

function MobileDialog() {
  const [open, setOpen] = React.useState(true);
  const handleClose = (value) => {
    setOpen(false);
  };

  return(
    <Dialog
      open={open}
    >
      <DialogTitle id="alert-dialog-title">{"Not supported"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This app is currently not supported on mobile, and as a result, you may experience bugs and glitches.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createChartData(time, amount) {
  return { time, amount };
}

function createHistoryData(id, date, outcome, status, fee, profit) {
  return { id, date, outcome, status, fee, profit };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGame: false,
      showInstr: false,
      loading: false,
      profit: 0,
      col1Idx: getRandomInt(col1.length),
      col2Idx: getRandomInt(col2.length),
      col3Idx: getRandomInt(col3.length),
      chartData: [
        createChartData(new Date().toLocaleTimeString("en-US"), 0),
      ],
      historyData: [
      ],
      curDate: new Date().toLocaleDateString("en-US"),
      curTime: new Date().toLocaleTimeString("en-US")
    };
    this.showGame = this.showGame.bind(this);
    this.showInstruction = this.showInstruction.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.startTime = this.state.curTime;
  }
  
  showGame(e) {
    if(!this.state.showGame) {
      this.setState({
        showGame: true,
        showInstr: false,
      });
    }

  }

  showInstruction(e) {
    if(!this.state.showInstr) {
      this.setState({
        showGame: false,
        showInstr: true,
      });
    }
  }

  setLoading(e) {
    if(!this.state.loading) {
      this.setState({
        loading: true,
      });
      this.col1Idx = getRandomInt(col1.length);
      this.col2Idx = getRandomInt(col2.length);
      this.col3Idx = getRandomInt(col3.length);
      this.slotTimer = setInterval(() => this.slotTick(), 100);
      this.updateTimer = setInterval(() => this.updateTick(), 5000);
    } else {
      this.setState({
        loading: false,
      });
      clearInterval(this.slotTimer);
    }
  }
  
  slotTick() {
    this.setState({
      col1Idx: this.state.col1Idx + 1,
      col2Idx: this.state.col2Idx + 1,
      col3Idx: this.state.col3Idx + 1,
    });
  }

  updateTick() {
    const id = this.state.historyData.length
    const newDate = new Date().toLocaleDateString("en-US")
    const newTime = new Date().toLocaleTimeString("en-US")
    const outcome = emojis[getRandomInt(emojis.length)] + emojis[getRandomInt(emojis.length)] + emojis[getRandomInt(emojis.length)]
    const fee = getRandomInt(3) + 1
    const profit = Math.random() >= 0.5  ? [0.5, 1, 1.5, 2, 2.5, 3][getRandomInt(6)] : -1 * fee
    const status = profit > 0 ? "Win" : "Lose"
    const newHistoryData = this.state.historyData.concat(createHistoryData(id, newDate + ' ' + newTime, outcome, status, fee, profit))
    const newChartData = this.state.chartData.concat(createChartData(newTime, this.state.profit + profit))
    this.setState({
      curDate: newDate,
      curTime: newTime,
      profit: this.state.profit + profit,   
      historyData: newHistoryData,
      chartData: newChartData,
    });
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    clearInterval(this.slotTimer);
    clearInterval(this.updateTimer);
  }
  
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <CssBaseline /> 
          {/* Mobile */}
          <MobileView>
            <MobileDialog/>
          </MobileView>
          {/* GitHub Button */}
          <Box textAlign="left" ml={5}>
            <Tooltip title="GitHub Repo">
              <a href={'https://github.com/jma8774/Slot-Machine-Crypto'} target="_blank" rel="noreferrer">
                <IconButton  className={classes.github_btn}>
                  <GitHubIcon/>
                </IconButton >
              </a>
            </Tooltip>
          </Box>
          {/* Introduction */}
          <Introduction 
            showInstruction={this.showInstruction} 
            showGame={this.showGame}
          />
          {/* Instruction, Game, Stats */}
          <Box width="100%">
            <Instruction 
              showInstr={this.state.showInstr}
            />
            <Game 
              showGame={this.state.showGame} 
              setLoading={this.setLoading} 
              ethEnabled={ethEnabled}
              loading={this.state.loading} 
              colIdx={[this.state.col1Idx, this.state.col2Idx, this.state.col3Idx]}
            />
            <Stats 
              showGame={this.state.showGame} 
              chartData={this.state.chartData}
              historyData={this.state.historyData}
              profit={this.state.profit}
              curDate={this.state.curDate}
              startTime={this.startTime}
            />
          </Box>
        </ThemeProvider>
      </div>
  )}
}

export default () => {
  const classes = useStyles();
  return (
    <App classes={classes} />
  )
}