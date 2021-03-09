import './App.css';
import 'fontsource-roboto';
import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { spacing } from "@material-ui/system";
import Fade from '@material-ui/core/Fade';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import green from "@material-ui/core/colors/green";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import CheckIcon from '@material-ui/icons/Check';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import DataGrid from '@material-ui/data-grid';
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SendIcon from '@material-ui/icons/Send';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Switch from '@material-ui/core/Switch';
import GitHubIcon from '@material-ui/icons/GitHub';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const statTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#4dabf5'},
    secondary: { main: green[500]},
  },
});

// 🍎 = Pikachu
// 🍌 = Lotad
// 🔁 = Replay
// 7️⃣ = Red 7
// 🍊 = Refund (Blue 7)
// 🍒 = Cherry
// 🍇 = Marill
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
  game_container: {
    backgroundColor: theme.palette.grey[900],
    borderRadius: theme.shape.borderRadius,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    maxWidth: 600,
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
    },
  },
  instruction_container: {
    backgroundColor: theme.palette.grey[900],
    borderRadius: theme.shape.borderRadius,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    maxWidth: 960,
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
    },
  },
  stats_container: {
    backgroundColor: theme.palette.grey[900],
    borderRadius: theme.shape.borderRadius,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    maxWidth: 960,
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
    },
  },
  game_paper: {
    position: "relative",
    backgroundColor: theme.palette.grey[900],
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    textAlign: 'center',
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
  stat_paper: {
    height: 300,
    backgroundColor: theme.palette.grey[900],
    textAlign: 'left',
  },
  stat_history: {
    backgroundColor: theme.palette.grey[900],
    textAlign: 'left',
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
// Metamask Pop-up
const ethEnabled = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    return true;
  }
  return false;
}

function Introduction({showInstruction, showGame}) {
  return (
    <Box mt={10}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
          Cryptocurrency Slot Machine
        </Typography>
        <Box py={2}>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Something short and leading about our game. Why this is a thing or why this should be a thing? Anyways, need to add something here later on. 
            At least 3 lines would probably look the best. That's why I am still typing so I can pad it out.
          </Typography>
        </Box>
        <div>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Tooltip title="Step-by-step instructions">
                <Button onClick={(e) => showInstruction(e)} variant="contained" color="primary">
                  How To Play
                </Button>
              </Tooltip>
            </Grid>
              <Grid item>
                <Tooltip title="Load game interface">
                  <Button onClick={(e) => showGame(e)} variant="contained" color="secondary">
                    Play Game
                  </Button>
                </Tooltip>
              </Grid>
          </Grid>
        </div>
      </Container>
    </Box>
  )
}

function Instruction({showInstr}) {
  const classes = useStyles();
  if(!showInstr) {
    return <span></span>
  }
  return (
    <Fade in={true} timeout={400}>
      <Box mt={10}>
        <CssBaseline /> 
        <Box component={Container} className={classes.instruction_container} boxShadow={5} textAlign="center">
          <Box mb={2}><Typography variant="h4" color="textPrimary">
            Instruction
          </Typography></Box>
          <Typography variant="subtitle1" color="textSecondary">
            Here we have instructions about how to play and how to win. Pictures included to explain things better.
          </Typography>
        </Box>
      </Box>
    </Fade>
  )
}

function Game({showGame, setLoading, loading, colIdx}) {
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
  
  if(!showGame) {
    return <span></span>
  }
  else{
    ethEnabled();
  }
  return (
    <Fade in={true} timeout={400}>
      <Box mt={10}>
        <Container maxWidth="sm">
            <Grid container justify="center" spacing={4}>
              {emojiDisplay.map((value, idx) => (
                  <Grid item key={idx} xs={4} md={4} lg={4}>
                    <Box boxShadow={3}>
                      <Paper className={classes.game_paper}>
                        {/* 1, 2, 3 indicators spawn */}
                        {idx === 0 &&
                          <span>
                            <Chip className={classes.rowIndicSide} label="2" color="primary"/>
                            <ThemeProvider theme={statTheme}>
                              <Chip className={classes.rowIndicDiagTop} label="3" color="secondary"/>
                            </ThemeProvider>
                          </span>
                        }
                        {idx === 3 &&
                          <Chip className={classes.rowIndicSide} label="1" color="secondary"/>
                        }
                        {idx === 6 &&
                          <span>
                            <Chip className={classes.rowIndicSide} label="2" color="primary"/>
                            <ThemeProvider theme={statTheme}>
                              <Chip className={classes.rowIndicDiagBot} label="3" color="secondary"/>
                            </ThemeProvider>
                          </span>
                        }
                        {/* Emoji spawn */}
                          <Typography component="h1" variant="h2">
                            {value}
                          </Typography>
                      </Paper>
                    </Box>
                  </Grid>
              ))}
            </Grid>
          </Container>
          <Box mt={3} mr={3}>
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <Button disabled={loading} variant="contained" color="primary" onClick={setLoading} endIcon={<SendIcon/>} >
                  Start 
                </Button>
              </Grid>
              {
                (loading
                  ? <Grid item>
                      <CircularProgress />
                    </Grid>
                  : <span></span>
                )
              }
            </Grid>
          </Box>
      </Box>
    </Fade>
  )
}

function Stats({showGame, data}) {
  const classes = useStyles();
  if(!showGame) {
    return <span></span>
  }
  return (
    <ThemeProvider theme={statTheme}>
      <Fade in={true} timeout={400}>
        <Box mt={10}>
          <Container maxWidth="md">
            <Box textAlign="left" mb={3}>
              <Typography variant="h3" color="textPrimary">
                Statistics
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Below contains information about your recent interactions with the app, such as your game history, balance and balance chart.
              </Typography>
            </Box>
            <Box>
                <Grid container justify="center" spacing={4}>
                  <Grid item xs={12} sm={8}>
                    <Paper className={classes.stat_paper} elevation={3}>
                      <Chart data={data.chartData}/>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper className={classes.stat_paper} elevation={3}>
                      <Balance />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Paper className={classes.stat_history} elevation={3}>
                      <History rows={data.historyData}/>
                    </Paper>
                  </Grid>
                </Grid>
            </Box>
          </Container>
        </Box>
      </Fade>
    </ThemeProvider>
  )
}

function Chart({data}) {
  return (
    <Container>
      <Box pt={2} pb={1}>
        <Typography component="h1" variant="h6" color="primary">
          <Box fontWeight="fontWeightBold">Today</Box>
        </Typography>
      </Box>
      <ResponsiveContainer width="99%" aspect={3}>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 25,
            bottom: -12,
            left: 11,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Earnings (ETH)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={statTheme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}

function Balance() {
  return (
    <Container>
      <Box pt={2} pb={1}>
        <Typography component="h1" variant="h6" color="primary">
          <Box fontWeight="fontWeightBold">Total Winnings</Box>
        </Typography>
      </Box>
      <Typography component="p" variant="h5" color="secondary">
        +100 ETH
      </Typography>
      <Typography color="textSecondary">
        on 15 March, 2019
      </Typography>
    </Container>
  )
}

function History({rows}) {
  const classes = useStyles();
  return (
    <Container>
      <Box pt={2} pb={1}>
        <Typography component="h1" variant="h6" color="primary">
          <Box fontWeight="fontWeightBold">History</Box>
        </Typography>
      </Box>
      <Box pb={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Outcome</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell align="right">Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.outcome}</TableCell>
                <TableCell>
                  <Chip
                      label={row.status}
                      icon={<DoneIcon />}
                      color="secondary"
                      variant="outlined"
                  />
                </TableCell>
                <TableCell>{row.fee}</TableCell>
                <TableCell align="right">
                  {row.profit > 0
                  ? <Typography color="secondary">{row.profit}</Typography>
                  : <Typography color="error">{row.profit}</Typography>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
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
      showGame: false,
      showInstr: false,
      loading: false,
      col1Idx: getRandomInt(col1.length),
      col2Idx: getRandomInt(col2.length),
      col3Idx: getRandomInt(col3.length),
    };
    this.showGame = this.showGame.bind(this);
    this.showInstruction = this.showInstruction.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.data = {
      chartData: [
        createChartData('00:00', 0),
        createChartData('03:00', 1),
        createChartData('06:00', 1.1),
        createChartData('09:00', -1),
        createChartData('12:00', 1.2),
        createChartData('15:00', 0.001),
        createChartData('18:00', 4),
        createChartData('21:00', 5),
        createChartData('24:00', undefined),
      ],
      historyData: [
        createHistoryData(0, '00:00, 16 Mar, 2019', '👋🏾👋🏾👋🏾', 'Win', 5, 7),
        createHistoryData(1, '03:00, 16 Mar, 2019', '🤚🏾🤚🏾🤚🏾', 'Win', 11, 22),
        createHistoryData(2, '06:00, 16 Mar, 2019', '🧜🏽‍♀️🧑🏽‍✈️', 'Win', 13, 500),
        createHistoryData(3, '07:00, 16 Mar, 2019', '🧜🏽‍♀️🧑🏽‍✈️', 'Win', 13, 654.39),
        createHistoryData(4, '07:15, 15 Mar, 2019', '🧜🏽‍♀️🧑🏽‍✈️', 'Win', 13, 212.79),
        createHistoryData(5, '08:00, 16 Mar, 2019', '🧜🏽‍♀️🧑🏽‍✈️', 'Win', 13, 312.44),
        createHistoryData(6, '08:11, 16 Mar, 2019', '🧜🏽‍♀️🧑🏽‍✈️', 'Win', 13, 866.99),
        createHistoryData(7, '09:00, 16 Mar, 2019', '🧜🏽‍♀️🧑🏽‍✈️', 'Win', 13, 100.81),
        createHistoryData(8, '10:00, 16 Mar, 2019', '🧜🏽‍♀️🧑🏽‍✈️', 'Win', 13, 654.39),
        createHistoryData(9, '11:00, 15 Mar, 2019', '🧜🏽‍♀️🧑🏽‍✈️', 'Win', 13, 212.79),
        createHistoryData(10, '12:00, 16 Mar, 2019', '🧜🏽‍♀️🧑🏽‍✈️', 'Win', 13, 312.44),
        createHistoryData(11, '13:00, 16 Mar, 2019', '🧜🏽‍♀️🧑🏽‍✈️', 'Win', 13, 866.99),
        createHistoryData(12, '14:00, 16 Mar, 2019', '🧜🏽‍♀️🧑🏽‍✈️', 'Win', 13, 100.81),
        createHistoryData(13, '15:00, 16 Mar, 2019', '🧜🏽‍♀️🧑🏽‍✈️', 'Win', 13, 654.39),
        
      ],
    } 
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
      this.interval = setInterval(() => this.tick(), 250);
    } else {
      this.setState({
        loading: false,
      });
    }
  }
  
  tick() {
    this.setState({
      col1Idx: this.state.col1Idx + 1,
      col2Idx: this.state.col2Idx + 1,
      col3Idx: this.state.col3Idx + 1,
    });
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
          {/* What To Show */}
          <Box width="100%">
            <Instruction 
              showInstr={this.state.showInstr}
            />
            <Game 
              showGame={this.state.showGame} 
              setLoading={this.setLoading} 
              loading={this.state.loading} 
              colIdx={[this.state.col1Idx, this.state.col2Idx, this.state.col3Idx]}
            />
            <Stats 
              showGame={this.state.showGame} 
              data={this.data} 
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
