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
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
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

function SnackbarDisplay({severity, msg, duration}) {
  const [open, setOpen] = React.useState(true);
  const handleClose = (event, reason) => {
    if(reason === "clickaway"){
      return
    }
    setOpen(false)
  };
  return(
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} variant="filled" severity={severity}>
        {msg}
      </Alert>
    </Snackbar>
  )
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
      hasMetaMask: false,
      account: '',
      value: '',
      txHash: '',
      showGame: false,
      showInstr: false,
      phase: 0,
      profit: 0,
      col1Idx: getRandomInt(col1.length),
      col2Idx: getRandomInt(col2.length),
      col3Idx: getRandomInt(col3.length),
      slowReelCol: -1,
      chartData: [createChartData(new Date().toLocaleTimeString("en-US"), 0)],
      historyData: [],
      curDate: new Date().toLocaleDateString("en-US"),
      curTime: new Date().toLocaleTimeString("en-US")
    };
    this.showGame = this.showGame.bind(this);
    this.showInstruction = this.showInstruction.bind(this);
    this.setPhase = this.setPhase.bind(this);
    this.sendTransaction = this.sendTransaction.bind(this);
    this.setValue = this.setValue.bind(this);
    this.startTime = this.state.curTime;
    this.sendTo = "0xe5eAFA94b92Ba8720544EeB2070594c7727f7E03";
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

  setPhase(e, phase) {
    this.setState({
      phase: phase,
    })
    
    // Waiting Phase
    if(phase === 0) {
      this.setState({
        slowReelCol: -1,
        txHash: '',
      })
      clearInterval(this.slowReelTimer);
      clearInterval(this.phase0Timer);
      clearInterval(this.slotTimer);
    } 
    // Loading Phase
    else if(phase === 1) {
      this.setState({
        col1Idx: getRandomInt(col1.length),
        col2Idx: getRandomInt(col2.length),
        col3Idx: getRandomInt(col3.length),
      })
      this.slotTimer = setInterval(() => this.slotTick(), 100);
    } 
    // Update Result Phase
    else if(phase === 2) {
      this.slowReelTimer = setInterval(() => this.slowReelTick(), 500);
      this.phase0Timer = setInterval((e) => this.setPhase(e, 0), 2500);
      this.updateTimer =  setInterval(() => this.updateTick(), 1600);
    }
  }

  setValue(value) {
    this.setState({
      value: value,
    })
  }
  
  // Function to animate each column's slow animation for when the result is showing
  slowReelTick() {
    this.setState({
      slowReelCol: this.state.slowReelCol + 1,
    })
  }

  // Function to animate each column's when it is loading
  slotTick() {
    this.setState({
      col1Idx: this.state.slowReelCol<0 ? this.state.col1Idx + 1 : this.state.col1Idx,
      col2Idx: this.state.slowReelCol<1 ? this.state.col2Idx + 1 : this.state.col2Idx,
      col3Idx: this.state.slowReelCol<2 ? this.state.col3Idx + 1 : this.state.col3Idx,
    });
  }

  // Function to update Stats randomly (for testing)
  updateTick() {
    const id = this.state.historyData.length
    const newDate = new Date().toLocaleDateString("en-US")
    const newTime = new Date().toLocaleTimeString("en-US")
    const outcome = emojis[getRandomInt(emojis.length)] + emojis[getRandomInt(emojis.length)] + emojis[getRandomInt(emojis.length)]
    const fee = getRandomInt(3) + 1
    const profit = Math.random() >= 0.5  ? [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4][getRandomInt(8)] : -1 * fee
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
    clearInterval(this.updateTimer);
  }

  // Get the address of the MetaMask when website loads
  async getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.setState({
      account: accounts[0],
    })
    console.log("Initialized with account: " + this.state.account)
  }

  // Automatically detects change to account in MetaMask
  async onAccountChange() {
    await window.ethereum.on('accountsChanged', (accounts) => {
      if(accounts.length === 0)
        return
      this.setState({
        account: accounts[0]
      })
      this.setState({
        hasMetaMask: true,
      })
      console.log("On account change to: " + this.state.account)
    });
  }

  async sendTransaction() {
    if(!this.state.hasMetaMask)
      return
    const transactionParameters = {
      nonce: '0x00', // ignored by MetaMask
      gasPrice: '0x174876e800', // customizable by user during MetaMask confirmation.
      gas: '0x7530', // customizable by user during MetaMask confirmation.
      to: this.sendTo, // Required except during contract publications.
      from: this.state.account, // must match user's active address.
      value: this.state.value, // Only required to send ether to the recipient from the initiating external account.
      data:
        '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
      chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };

    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    })
    .then((txHash) => {
      console.log("Transaction confirmed: Block is located at https://kovan.etherscan.io/tx/" + txHash)
      this.setState({
        txHash: txHash,
      })
    })
    .catch(() => {
      console.log("User denied transaction.");
    })
    this.setPhase(null, 2);
  }

  // This function is called first when React is built
  async componentDidMount() {
    // MetaMask shenanigans
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      this.setState({
        hasMetaMask: true,
      })
      this.getAccount()
      this.onAccountChange()
    } else {
      console.log('MetaMask is not installed!');
    }
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
          {/* Update Snackbars for various things */}
          {(this.state.hasMetaMask && !this.state.account) &&
            <SnackbarDisplay severity="error" duration={2000} msg="Please login to MetaMask."/>
            }
          {(this.state.hasMetaMask && this.state.account) &&
            <SnackbarDisplay severity="success" duration={2000} msg="MetaMask is ready to go!"/>
          }
          {!this.state.hasMetaMask &&
            <SnackbarDisplay severity="error" duration={4000} msg="MetaMask is not installed, please follow the instructions and set it up."/>
          }
          {(this.state.txHash && this.state.phase === 2) &&
            <SnackbarDisplay severity="success" duration={8000} msg={"Transaction confirmed at https://kovan.etherscan.io/tx/" + this.state.txHash}/>
          }
          {(!this.state.txHash && this.state.phase === 2) &&
            <SnackbarDisplay severity="error" duration={6000} msg="Transaction failed."/>
          }
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
              account={this.state.account}
              setValue={this.setValue}
              value={this.state.value}
              setPhase={this.setPhase} 
              sendTransaction={this.sendTransaction}
              phase={this.state.phase} 
              colIdx={[this.state.col1Idx, this.state.col2Idx, this.state.col3Idx]}
              slowReelCol={this.state.slowReelCol}
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