import 'fontsource-roboto';
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { ThemeProvider } from '@material-ui/core/styles';
import { Typography, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
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
import Backdrop from '@material-ui/core/Backdrop';
// Custom Components
import Introduction from './Introduction';
import Instruction from './Instruction';
import Game from './Game';
import Stats from './Stats';

const Web3 = require('web3')
const metaNet = new Web3(window.web3.currentProvider);
const contract_addr = '0xb60a6B392EBF38DF17B4a97765Da677C79E21C25'
const contract_abi = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "GameResult",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "FinishedGames",
		"outputs": [
			{
				"internalType": "enum SlotMachine.State",
				"name": "state",
				"type": "uint8"
			},
			{
				"internalType": "address payable",
				"name": "playerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "playerBetAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "prizeMoney",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "result",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Games",
		"outputs": [
			{
				"internalType": "enum SlotMachine.State",
				"name": "state",
				"type": "uint8"
			},
			{
				"internalType": "address payable",
				"name": "playerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "playerBetAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "prizeMoney",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "result",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "closeContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "fundCasino",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCasinoBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFinishedGames",
		"outputs": [
			{
				"components": [
					{
						"internalType": "enum SlotMachine.State",
						"name": "state",
						"type": "uint8"
					},
					{
						"internalType": "address payable",
						"name": "playerAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "playerBetAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					},
					{
						"internalType": "uint256[3][3]",
						"name": "slotsState",
						"type": "uint256[3][3]"
					},
					{
						"internalType": "uint256",
						"name": "prizeMoney",
						"type": "uint256"
					},
					{
						"internalType": "string[]",
						"name": "linesWon",
						"type": "string[]"
					},
					{
						"internalType": "string",
						"name": "result",
						"type": "string"
					}
				],
				"internalType": "struct SlotMachine.Game[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getGames",
		"outputs": [
			{
				"components": [
					{
						"internalType": "enum SlotMachine.State",
						"name": "state",
						"type": "uint8"
					},
					{
						"internalType": "address payable",
						"name": "playerAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "playerBetAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					},
					{
						"internalType": "uint256[3][3]",
						"name": "slotsState",
						"type": "uint256[3][3]"
					},
					{
						"internalType": "uint256",
						"name": "prizeMoney",
						"type": "uint256"
					},
					{
						"internalType": "string[]",
						"name": "linesWon",
						"type": "string[]"
					},
					{
						"internalType": "string",
						"name": "result",
						"type": "string"
					}
				],
				"internalType": "struct SlotMachine.Game[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "enum SlotMachine.State",
						"name": "state",
						"type": "uint8"
					},
					{
						"internalType": "address payable",
						"name": "playerAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "playerBetAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					},
					{
						"internalType": "uint256[3][3]",
						"name": "slotsState",
						"type": "uint256[3][3]"
					},
					{
						"internalType": "uint256",
						"name": "prizeMoney",
						"type": "uint256"
					},
					{
						"internalType": "string[]",
						"name": "linesWon",
						"type": "string[]"
					},
					{
						"internalType": "string",
						"name": "result",
						"type": "string"
					}
				],
				"internalType": "struct SlotMachine.Game[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLinesWon",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwnerAddress",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPrizeMoney",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getResults",
		"outputs": [
			{
				"components": [
					{
						"internalType": "enum SlotMachine.State",
						"name": "state",
						"type": "uint8"
					},
					{
						"internalType": "address payable",
						"name": "playerAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "playerBetAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					},
					{
						"internalType": "uint256[3][3]",
						"name": "slotsState",
						"type": "uint256[3][3]"
					},
					{
						"internalType": "uint256",
						"name": "prizeMoney",
						"type": "uint256"
					},
					{
						"internalType": "string[]",
						"name": "linesWon",
						"type": "string[]"
					},
					{
						"internalType": "string",
						"name": "result",
						"type": "string"
					}
				],
				"internalType": "struct SlotMachine.Game",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRow1",
		"outputs": [
			{
				"internalType": "uint256[3]",
				"name": "",
				"type": "uint256[3]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRow2",
		"outputs": [
			{
				"internalType": "uint256[3]",
				"name": "",
				"type": "uint256[3]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRow3",
		"outputs": [
			{
				"internalType": "uint256[3]",
				"name": "",
				"type": "uint256[3]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSlots",
		"outputs": [
			{
				"internalType": "uint256[3][3]",
				"name": "",
				"type": "uint256[3][3]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "playerBet",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "symbolWorth",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawCasinoFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const contract = new metaNet.eth.Contract(
  contract_abi,
  contract_addr,
);

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
const emojis = ['🍎','🔁','🍒','🍌','🍇','🍊','7️⃣']
const col1 = ['🍎','🍌','🔁','7️⃣','🍒','🍇','🔁','🍎','🍌','🍊','🍌','🍒','🍎','🔁','🍇','7️⃣','🍎','🍌','🔁','🍇','🍊']
const col2 = ['🍎','🍎','🍌','🍊','🍌','🍊','🍒','🍇','🍌','🔁','🍒','🍌','🔁','🍒','7️⃣','🍒','🔁','🍌','🍇','🍒','🔁'] 
const col3 = ['🍎','🔁','🍌','🍒','7️⃣','🍎','🍊','🔁','🍌','🍇','🔁','🍌','🍎','🍇','🔁','🍌','🍇','🍎','🔁','🍌','🍇']
const linesLookup = {
	"top": [0, 1, 2],
	"middle": [3, 4, 5],
	"bottom": [6, 7, 8],
	"majorDiagonal": [0, 4, 8],
	"minorDiagonal": [2, 4, 6],
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

function epochToDate(epoch) {
  var utcSeconds = epoch;
  var d = new Date(0);
  d.setUTCSeconds(utcSeconds);
  return d
}

function parseOutcome(game) {
  var newString = ''
  const rows = game[6]
  const grid = game[4]
  rows.forEach(row => {
		linesLookup[row].forEach((num) => {
			newString += emojis[parseInt(grid[Math.floor(num/3)][num%3])]
		})
    newString += '/'
  })
	console.log("Winning lines:", rows)
  console.log("Winning outcomes:", newString.substring(0, newString.length-1))
  return newString.substring(0, newString.length-1)
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
			backdrop: false,
      hasMetaMask: false,
      account: '',
      value: '',
      txHash: '',
			transError: false,
      showGame: false,
      showInstr: false,
      phase: 0,
      gameResult: null,
      profit: 0,
      col1Idx: getRandomInt(col1.length),
      col2Idx: getRandomInt(col2.length),
      col3Idx: getRandomInt(col3.length),
      slowReelCounter: -1,
      chartData: [createChartData(new Date().toLocaleTimeString("en-US"), 0)],
      historyData: [],
			page: 0,
      startDate: new Date(),
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
    this.setState({
      phase: phase,
    })
    
    // Waiting Phase
    if(phase === 0) {
      console.log("Phase 0")
			clearInterval(this.slotTimer);
      clearInterval(this.slowReelTimer);
      clearInterval(this.phase0Timer);
      clearInterval(this.checkContractTimer);
    } 
    // Loading Phase
    else if(phase === 1) {
      console.log("Phase 1")
      this.setState({
        col1Idx: getRandomInt(col1.length),
        col2Idx: getRandomInt(col2.length),
        col3Idx: getRandomInt(col3.length),
      })
      this.slotTimer = setInterval(() => this.slotTick(), 100);
      const curTime = Math.round(Date.now() / 1000) // cur time in epoch
      this.checkContractTimer = setInterval(() => this.checkContractTick(curTime), 3500);
    } 
    // Update Result Phase
    else if(phase === 2) {
      console.log("Phase 2")
      this.phase0Timer = setInterval((e) => this.setPhase(e, 0), 3000);
    }
  }

  setValue(value) {
    this.setState({
      value: value,
    })
  }

  // Function to animate each column's when it is loading
  slotTick() {
    const newSlowCounter = this.state.phase===2 ? this.state.slowReelCounter + 1 : this.state.slowReelCounter
    this.setState({
      slowReelCounter: newSlowCounter,
      col1Idx: newSlowCounter>=0 ? this.setCol(this.state.gameResult, 0) : this.state.col1Idx + 1,
      col2Idx: newSlowCounter>=5 ? this.setCol(this.state.gameResult, 1) : this.state.col2Idx + 1,
      col3Idx: newSlowCounter>=10 ? this.setCol(this.state.gameResult, 2) : this.state.col3Idx + 1,
    });
  }

	// Set Final Grid in Phase 2
	setCol(gameResult, idx) {
		if(gameResult === null) 
			return this.state.col1Idx

		const grid = gameResult[4]
		var selectedCol
		if(idx === 0)
			selectedCol = col1
		else if(idx === 1)
			selectedCol = col2
		else if(idx === 2)
			selectedCol = col3
		const need = [grid[0][idx], grid[1][idx], grid[2][idx]].map((res) => emojis[res])
		for(var i=0; i<selectedCol.length; i++) {
			const [x0, x1, x2] = [selectedCol[i], selectedCol[(i+1)%selectedCol.length], selectedCol[(i+2)%selectedCol.length]]
			if(x0 === need[0] && x1 === need[1] && x2 === need[2])
				return i
		}
		return 0
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
    console.log("Update tick", game)
    const id = this.state.historyData.length
    const date = epochToDate(game[3])
    const newDate = date.toLocaleDateString("en-US")
    const newTime = date.toLocaleTimeString("en-US")
    var outcome = parseOutcome(game)
    const fee = game[2]
    const profit = game[5] - fee
    const status = profit < 0 ? "Lose" : "Win"
    const newHistoryData = this.state.historyData.concat(createHistoryData(id, newDate + ' ' + newTime, outcome, status, fee, profit))
    const newChartData = this.state.chartData.concat(createChartData(newTime, this.state.profit + profit))
    this.setState({
			profit: this.state.profit + profit,   
      historyData: newHistoryData,
      chartData: newChartData,
    });
  }

  // Get the address of the MetaMask when website loads
  async getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		const curAcc = accounts[0]
    this.setState({
      account: curAcc,
    })

		this.parseHistory(() => console.log("Initialized with account: " + this.state.account))
  }

  // Send transaction
  playerBet() {
    if(!this.state.hasMetaMask)
      return
		this.setState({
			slowReelCounter: -1,
			txHash: '',
			transError: false,
			gameResult: null,
		})
    contract.methods.playerBet().send({
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
    .then(receipt => {
      console.log("Transaction mined: Block is located at https://kovan.etherscan.io/tx/" + receipt.transactionHash)
      this.setState({
        txHash: receipt.transactionHash,
      })
    })
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
			this.parseHistory(() => console.log("On account change to: " + this.state.account))
    });
  }


	// Get past games and parse to history
	parseHistory(callback) {
		this.setState({
			chartData: [createChartData(new Date().toLocaleTimeString("en-US"), 0)],
      historyData: [],
			profit: 0,
			backdrop: true,
			page: 0,
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
				startDate: new Date(this.state.historyData[0].date),
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
            <SnackbarDisplay severity="success" duration={8000} msg={"Transaction mined at https://kovan.etherscan.io/tx/" + this.state.txHash}/>
          }
          {(this.state.transError && this.state.phase === 2) &&
            <SnackbarDisplay severity="error" duration={6000} msg="Transaction failed."/>
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
              colIdx={[this.state.col1Idx, this.state.col2Idx, this.state.col3Idx]}
              slowReelCounter={this.state.slowReelCounter}
							gameResult={this.state.gameResult}
            />
            <Stats 
              showGame={this.state.showGame} 
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