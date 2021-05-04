import 'fontsource-roboto';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { ThemeProvider } from '@material-ui/core/styles';
import { Typography, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from '@material-ui/core/styles/makeStyles';
import { isMobile, MobileView } from "react-device-detect";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GitHubIcon from '@material-ui/icons/GitHub';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
// Custom Components
import Introduction from './Introduction';
import Instruction from './Instruction';
import Game from './Game';
import Stats from './Stats';

const ContractABI = require('./ContractABI.js')
const Web3 = require('web3')
const Crypto = require('crypto')
var metaNet
var contract_addr 
var contract_abi
var contract


if(!isMobile) {
	metaNet = new Web3(window.web3.currentProvider);
	contract_addr = ContractABI.contract_addr
	contract_abi = ContractABI.contract_abi
	contract = new metaNet.eth.Contract(
		contract_abi,
		contract_addr,
	);
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const emojis = ['🍎','🔁','🍒','🍌','🍇','🍊','🥝','7️⃣']
const linesLookup = {
	"top": [0, 1, 2],
	"middle": [3, 4, 5],
	"bottom": [6, 7, 8],
	"majorDiagonal": [0, 4, 8],
	"minorDiagonal": [6, 4, 2],
}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
	backdrop: {
		backgroundColor: theme.palette.grey[900],
		zIndex: 2,
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




function SnackbarDisplay({severity, msg, link, duration}) {
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
			{link && 
				<a href={link} target="_blank" rel="noreferrer" style={{color: 'white'}}>{link.substring(0, 60) + '...'}</a>
			}
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

// Return an array of length n, filled with random emojis
function arrayRandomFill(n) {
  var arr = []
  for(var i = 0; i < n; i ++) {
    arr.push(emojis[getRandomInt(emojis.length)])
  }
  return arr
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createChartData(time, amount) {
  return { time, amount };
}

function createHistoryData(id, date, outcome, status, fee, profit, grid) {
  return { id, date, outcome, status, fee, profit, grid};
}

function epochToDate(epoch) {
  var utcSeconds = epoch;
  var d = new Date(0);
  d.setUTCSeconds(utcSeconds);
  return d
}

function parseOutcome(game) {
  var newString = ''
  // console.log("(Testing) Parsed game result data from smart contract:", game)
  const rows = game[6]
  const grid = game[4]
  rows.forEach(row => {
		linesLookup[row].forEach((num) => {
			newString += emojis[parseInt(grid[Math.floor(num/3)][num%3])]
		})
    newString += '/'
  })
	// console.log("Winning lines:", rows)
  // console.log("Winning outcomes:", newString.substring(0, newString.length-1))
  return newString.substring(0, newString.length-1)
}

function randNumGen() {
  const arr = Crypto.randomBytes(256);

  var temp = [];
  for(var i = 0; i < arr.length; i++) {
    temp.push(arr[i] % 8);
  }

  function splitArray(array) {
    var tmp = [];
    for(var i = 0; i < 9; i+=3) {
      tmp.push(Array.from(array.slice(i, i + 3)));
    }
    return tmp;
  }

  // Return array for slot machine symbols, and original array for future hashing
  return [splitArray(temp), arr];
}

// Take in player address, the original array before mod 7, and the slot matrix
async function hash(player_address, randBytes, slotRandomNumbers) {
  // const [randBytes, slotRandomNumbers] = randNumGen();
  // Create the hash
  const hash = Crypto.createHash('sha256');
  const hashResult = hash.update(randBytes).update(slotRandomNumbers).update(player_address).digest('hex');
  return hashResult;
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
			backdrop: false,
      hasMetaMask: false,
      wrongNetwork: false,
			parsingHistory: false,
      account: '',
      value: '',
      receipt: '',
			transError: false,
      showGame: false,
      showInstr: false,
      phase: 0,
      gameResult: null,
      profit: 0,
      grid: arrayRandomFill(9),
      slowReelCounter: -1,
      chartData: [createChartData(new Date().toLocaleTimeString("en-US"), 0)],
      historyData: [],
      numWins: 0,
			page: 0,
      startDate: new Date(),
      hash: '',
    };
    this.showGame = this.showGame.bind(this);
    this.showInstruction = this.showInstruction.bind(this);
    this.setPhase = this.setPhase.bind(this);
    this.playerBet = this.playerBet.bind(this);
    this.setValue = this.setValue.bind(this);
		this.setPage = this.setPage.bind(this);
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

	setPage(page) {
		this.setState({
			page: page,
		})
	}

  setPhase(e, phase) {
		if(this.state.phase === phase)
			return

    this.setState({
      phase: phase,
    })
    
    // Waiting Phase
    if(phase === 0) {
      console.log("Phase 0")
      clearInterval(this.phase0Timer);
			clearInterval(this.slotTimer);
      clearInterval(this.slowReelTimer);
      clearInterval(this.checkContractTimer);
    } 
    // Loading Phase
    else if(phase === 1) {
      console.log("Phase 1")
      this.slotTimer = setInterval(() => this.slotTick(), 100);
      const curTime = Math.round(Date.now() / 1000) // cur time in epoch
      this.checkContractTimer = setInterval(() => this.checkContractTick(curTime), 3500);
    } 
    // Update Result Phase
    else if(phase === 2) {
      console.log("Phase 2")
      this.phase0Timer = setInterval((e) => {
				clearInterval(this.phase0Timer);
				this.setPhase(e, 0)
			}
			, 2000);
    }
  }

  setValue(value) {
    this.setState({
      value: value,
    })
  }

  // Function to animate each column's when it is loading
  slotTick() {
    var newSlowCounter = this.state.slowReelCounter
    var newGrid = arrayRandomFill(9)
    if(this.state.phase === 2) {
      newSlowCounter = this.state.slowReelCounter + 1
      const finalGrid = this.state.gameResult 
        ? this.state.gameResult[4].flat().map((value, idx) => emojis[parseInt(value)]) 
        : ['❌','❌','❌','❌','❌','❌','❌','❌','❌']
      // 1D Array of final emojis grid
      newGrid = finalGrid
      if(newSlowCounter >= 5 && newSlowCounter < 10) {
        for(let i=0; i<9; i++) {
          newGrid[i] = i%3 === 2 ? emojis[getRandomInt(emojis.length)] : newGrid[i]
        }
      } else if(newSlowCounter > -1 && newSlowCounter < 5) {
        for(let i=0; i<9; i++) {
          newGrid[i] = i%3 >= 1  ? emojis[getRandomInt(emojis.length)] : newGrid[i]
        }
      }
    }
    this.setState({
      slowReelCounter: newSlowCounter,
      grid: newGrid,
    });
  }

  // Periodically checks if game is done
  checkContractTick(curTime) {
    contract.methods.getFinishedGames().call()
    .then(res => {
      var gameResult = this.getLatestGame(res)
      if(gameResult && gameResult[3] > curTime) {
        clearInterval(this.checkContractTimer)
        // console.log("Time:",gameResult[3],'>',curTime)
        this.setState({
          gameResult: gameResult
        })
        this.updateStats(this.state.gameResult)
        this.setPhase(null, 2);
      }
    })
  }

	// 0: state
	// 1: player address
	// 2: player bet
	// 3: time
	// 4: grid
	// 5: profit
	// 6: lines won
	// 7: result
	// Input a game to update Stats
  updateStats(game) {
    // console.log("Update tick", game)
    const id = this.state.historyData.length
    const date = epochToDate(game[3])
    const newDate = date.toLocaleDateString("en-US")
    const newTime = date.toLocaleTimeString("en-US")
    // Overlap problem when user switches back and forth between accounts (troll)
    if(id > 0 && this.state.historyData[id-1].date === newDate + ' ' + newTime)
      return
    var outcome = parseOutcome(game)
    const fee = game[2]
    const profit = game[5] - fee
    const status = profit < 0 ? "Lose" : "Win"
    const newHistoryData = this.state.historyData.concat(createHistoryData(id, newDate + ' ' + newTime, outcome, status, fee, profit, game[4]))
    const newChartData = this.state.chartData.concat(createChartData(newTime, this.state.profit + profit))
    this.setState({
			profit: this.state.profit + profit,   
      historyData: newHistoryData,
      chartData: newChartData,
      numWins: status === "Win" ? this.state.numWins + 1 : this.state.numWins
    });
  }

  // Get the address of the MetaMask when website loads
  async getAccount() {
    // Chain ID 42 = Kovan Test Network
    const chain = await window.ethereum.request({ method: 'net_version' })
    if(parseInt(chain) !== 42) {
      this.setState({
        account: '',
        wrongNetwork: true,
      })
      return
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		const curAcc = accounts[0]
    this.setState({
      account: curAcc,
    })

		this.parseHistory(() => console.log("Initialized with account: " + this.state.account))
  }

  // Send transaction
  async playerBet() {
    if(!this.state.hasMetaMask)
      return
		clearInterval(this.phase0Timer);
		this.setState({
			slowReelCounter: -1,
			receipt: '',
			transError: false,
			gameResult: null,
		})
    const arrayValues = randNumGen();
    const slots = arrayValues[0];
    console.log(slots)
    const originalValues = arrayValues[1];
    const currentHash = await hash(this.state.account, originalValues, slots);
    console.log("Creating Hash:", currentHash);
    this.setState({
      hash: currentHash,
    })
    console.log("Current Hash:", this.state.hash)
    contract.methods.playerBet(slots).send({
      from: this.state.account,
      value: this.state.value
    })
    .on('error', () => {
			this.setState({
				transError: true,
			})
			this.setPhase(null, 2)
      console.log("Transaction failed.");
    })
    .on('sending', () => {
      if(currentHash !== this.state.hash) {
        this.setState({
          transError: true,
        })
        this.setPhase(null, 2)
        console.log("Transaction failed. Something was changed illegally.");
      }
    })
    .then(receipt => {
      console.log("Transaction mined: Block is located at https://kovan.etherscan.io/tx/" + receipt.transactionHash)
      console.log("Hash after transaction:", this.state.hash);
      this.setState({
        receipt: receipt,
      })
    })
  }

  // Automatically detects change to account in MetaMask
  async onAccountChange() {
    const chain = await window.ethereum.request({ method: 'net_version' })
    if(parseInt(chain) !== 42) {
      this.setState({
        account: '',
        wrongNetwork: true,
      })
      return
    }
    window.ethereum.on('accountsChanged', (accounts) => {
      if(accounts.length === 0)
        return
      this.setState({
        account: accounts[0]
      })
      this.setState({
        hasMetaMask: true,
      })
			this.parseHistory(() => console.log("On account change to: " + this.state.account))
    });
  }

  async onChainChange() {
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });
  }

	// Get past games and parse to history
	parseHistory(callback) {
		if(this.state.parsingHistory)
			return
		this.setState({
			chartData: [createChartData(new Date().toLocaleTimeString("en-US"), 0)],
      historyData: [],
			profit: 0,
      numWins: 0,
			backdrop: true,
			page: 0,
			parsingHistory: true,
		})
		contract.methods.getFinishedGames().call()
		.then(res => {
			res.forEach(game => {
				if(game[1].toUpperCase() === this.state.account.toUpperCase())
					this.updateStats(game)
			})
			console.log("Finished processing past games")
			callback()
			this.setState({
				backdrop: false,
				startDate: this.state.historyData.length === 0 ? new Date() : new Date(this.state.historyData[0].date),
				parsingHistory: false,
			})
		})
	}

  getLatestGame(res) {
    for(var i = res.length-1; i >= 0; i --) {
      var ele = res[i]
      if(ele[1].toUpperCase() === this.state.account.toUpperCase()) {
        return ele
      }
    }
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
      this.onChainChange()

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
            <SnackbarDisplay severity="error" duration={3500} msg="Please login to MetaMask."/>
          }
          {this.state.wrongNetwork &&
            <SnackbarDisplay severity="error" duration={3500} msg="Please connect to the Kovan Test Network."/>
          }
          {(this.state.hasMetaMask && this.state.account) &&
            <SnackbarDisplay severity="success" duration={3500} msg="MetaMask is ready to go!"/>
          }
          {!this.state.hasMetaMask &&
            <SnackbarDisplay severity="error" duration={5000} msg="MetaMask is not installed, please follow the instructions and set it up."/>
          }
					{(this.state.phase === 1 && this.state.receipt && this.state.receipt.from.toUpperCase() !== this.state.account.toUpperCase()) &&
						<SnackbarDisplay severity="error" duration={10000} msg="Please switch back to your other MetaMask account to see the results."/>
					}
          {(this.state.receipt && this.state.receipt.from.toUpperCase() === this.state.account.toUpperCase()) &&
            <SnackbarDisplay severity="success" duration={7000} msg={"Transaction mined at: \n"} link={"https://kovan.etherscan.io/tx/" + this.state.receipt.transactionHash}/>
          }
          {this.state.transError &&
            <SnackbarDisplay severity="error" duration={4000} msg="Transaction failed."/>
          }
					{/* Backdrop */}
					<Backdrop className={classes.backdrop} open={this.state.backdrop}>
						<Typography variant="h5">
							Please wait while we load up all the information...
						</Typography>
					</Backdrop>
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
              playerBet={this.playerBet}
              phase={this.state.phase} 
              grid={this.state.grid}
              slowReelCounter={this.state.slowReelCounter}
							gameResult={this.state.gameResult}
            />
            <Stats 
              showGame={this.state.showGame} 
              winRate={this.state.historyData.length === 0 ? null : (this.state.numWins/this.state.historyData.length) * 100}
              chartData={this.state.chartData}
              historyData={this.state.historyData}
              profit={this.state.profit}
              startDate={this.state.startDate}
							page={this.state.page}
							setPage={this.setPage}
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
