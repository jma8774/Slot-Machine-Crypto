import 'fontsource-roboto';
import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from '@material-ui/core/styles/makeStyles';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  instruction_container: {
    position: "relative",
    backgroundColor: theme.palette.grey[900],
    borderRadius: theme.shape.borderRadius,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    maxWidth: 960,
    [theme.breakpoints.down('md')]: {
      maxWidth: theme.breakpoints.values.sm,
      borderRadius: 0,
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.breakpoints.values.md - theme.spacing(15),
      borderRadiius: 0,
    },
  },
  titleAlignLeft: {
    position: "absolute",
    left: theme.spacing(3),
    bottom: theme.spacing(4),

  },
  picture: {
    height: "auto",
    [theme.breakpoints.down('md')]: {
      width: "100%",
    },
    [theme.breakpoints.up('md')]: {
      width: "60%",
    },
  },
  paperColor: {
    backgroundColor: theme.palette.background.paper,
  },
  steps: {
    marginTop: theme.spacing(2),
  },
  primary: {
    color: theme.palette.primary.main
  },
  secondary: {
    color: theme.palette.secondary.main
  },
  green: {
    color: theme.palette.success.main
  },
}));

function Primary({txt}) {
  const classes = useStyles();
  return (
    <span className={classes.primary}>{txt}</span>
  )
}

function Secondary({txt}) {
  const classes = useStyles();
  return (
    <span className={classes.secondary}>{txt}</span>
  )
}

function Green({txt}) {
  const classes = useStyles();
  return (
    <span className={classes.green}>{txt}</span>
  )
}

function Instruction({showInstr}) {
  const classes = useStyles();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const [showMetaMask, setMetaMask] = useState(false);
  const [showGameInstr, setGameInstr] = useState(false);

  if(!showInstr) {
    return <span></span>
  }
  return (
    <Fade in={true} timeout={400}>
      <Box mt={10} mb={4}>
        <CssBaseline /> 
        {/* MetaMask */}
        <Box component={Container} className={classes.instruction_container} boxShadow={5} textAlign="left">
          <Box textAlign="right">
            {!showMetaMask && 
              <Typography variant="h5" className={classes.titleAlignLeft}>
                MetaMask Setup
              </Typography>
            }
            <IconButton onClick={() => {setMetaMask(!showMetaMask)}}>
              {showMetaMask
                ? <ExpandLessIcon/>
                : <ExpandMoreIcon/>
              }
            </IconButton >
          </Box>
          {showMetaMask &&
            <React.Fragment>
              <Box textAlign="center" mb={2}>
                <Typography variant="h4" color="textPrimary">
                  MetaMask Setup
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  In this section, we will talk about how to install MetaMask.
                </Typography>
              </Box>
              <Divider variant="middle" light/>
              <Box component={Container}>
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 1
                  <Typography variant="subtitle1" color="textSecondary">
                    Install the <Link href="https://metamask.io/download.html" target="_blank" rel="noreferrer" color="secondary">MetaMask</Link> extension.
                  </Typography>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 2
                  <Typography variant="subtitle1" color="textSecondary">
                    After installing, in the new pop up window, click "Create a Wallet".
                  </Typography>
                  <img alt="Step 2 MetaMask" className={classes.picture} src={process.env.PUBLIC_URL + "/metamask_2.png"}/>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 3
                  <Typography variant="subtitle1" color="textSecondary">
                    Secret Backup Phrase should be saved in case you lose your account.
                  </Typography>
                  <img alt="Step 3 MetaMask" className={classes.picture} src={process.env.PUBLIC_URL + "/metamask_3.png"}/>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 4
                  <Typography variant="subtitle1" color="textSecondary">
                    Click on the MetaMask extension located at the top right and switch from the Ethereum Mainnet to the Kovan Test Network. 
                  </Typography>
                  <img alt="Step 4 MetaMask" className={classes.picture} src={process.env.PUBLIC_URL + "/metamask_4.png"}/>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 5
                  <Typography variant="subtitle1" color="textSecondary">
                    To get testing Ether, we head to the <Link href="https://gitter.im/kovan-testnet/faucet" target="_blank" rel="noreferrer" color="secondary">faucet</Link>. 
                    Then, copy the account address and paste it into the faucet chatroom. (It can take up to a minute or more to receive your 6 Ether)
                  </Typography>
                  <img alt="Step 5 MetaMask" className={classes.picture} src={process.env.PUBLIC_URL + "/metamask_5.png"}/>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 6
                  <Typography variant="subtitle1" color="textSecondary">
                    Refresh the website and if prompted, connect your Etherum wallet to this website. *
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    * ⚠️ MetaMask will default to your first account if your current account is not connected.
                  </Typography>
                  <img alt="Step 6 MetaMask" className={classes.picture} src={process.env.PUBLIC_URL + "/metamask_6.png"}/>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 7
                  <Typography variant="subtitle1" color="textSecondary">
                    Refresh the website and you should receieve a success message.
                  </Typography>
                  <img alt="Step 7 MetaMask" className={classes.picture} src={process.env.PUBLIC_URL + "/metamask_7.png"}/>
                </Typography>
              </Box>
            </React.Fragment>
          }
        </Box>

        {/* Game Instruction */}
        <Box component={Container} className={classes.instruction_container} boxShadow={5} textAlign="left" mt={4}>
          <Box textAlign="right">
            {!showGameInstr && 
              <Typography variant="h5" className={classes.titleAlignLeft}>
                Game Instructions
              </Typography>
            }
            <IconButton onClick={() => {setGameInstr(!showGameInstr)}}>
              {showGameInstr
                ? <ExpandLessIcon/>
                : <ExpandMoreIcon/>
              }
            </IconButton >
          </Box>
          {showGameInstr &&
            <React.Fragment>
              <Box textAlign="center" mb={2}>
                <Typography variant="h4" color="textPrimary">
                  Game Instructions
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  In this section, we will talk about how to start a game and the game rules.
                </Typography>
              </Box>
              <Divider variant="middle" light/>
              <Box component={Container}>
                <Typography component='div' variant="h5" color="textPrimary" className={classes.steps}>
                  Game Rules
                  <Typography variant="subtitle1" color="textSecondary">
                    Betting <span className={classes.secondary}>1 Wei</span> will allow you to win from the <Secondary txt="middle"/> row. <br/>
                    Betting <span className={classes.primary}>2 Wei</span> will allow you to win from the <Primary txt="top"/>, <Secondary txt="middle"/>, and <Primary txt="bottom"/> rows. <br/>
                    Betting <span className={classes.green}>3 Wei</span> will allow you to win from the <Primary txt="top"/>, <Secondary txt="middle"/>, <Primary txt="bottom"/> and <Green txt="diagonal"/> rows. <br/>
                  </Typography>
                  <img alt="Step 1 Game" className={classes.picture} src={process.env.PUBLIC_URL + "/game_wei.png"}/>
                  <Typography component='div' variant="h5" color="textPrimary" className={classes.steps}>
                    Winning Combinations *
                  </Typography>
                  <Box width={md ? "100%" : "60%"} mt={1}>
                    <Grid container>
                      {
                      [
                        ['🍒❓❓', '2 Wei'], 
                        ['🍒🍒❓', '4 Wei'], 
                        ['🍒🍒🍒', '6 Wei'], 
                        ['🍎🍎🍎', '3 Wei'], 
                        ['🍌🍌🍌', '6 Wei'], 
                        ['🍇🍇🍇', '12 Wei'], 
                        ['🍊🍊🍊', '100 Wei'], 
                        ['7️⃣7️⃣7️⃣', '300 Wei'], 
                        ['🔁🔁🔁', 'Refund if no other winning combinations']
                      ].map((val) => (
                        <React.Fragment>
                          <Grid item xs={3} sm={3} md={3} lg={3}> 
                            <Typography>
                              {val[0]}
                            </Typography>
                          </Grid>
                          <Grid item xs={9} sm={9} md={9} lg={9}> 
                            <Typography color="textSecondary">
                              {val[1]}
                            </Typography>
                          </Grid>
                        </React.Fragment>
                      ))
                      }
                    </Grid>
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    * Combinations applies to all rows that you paid for (Example: 2 rows of 7️⃣7️⃣7️⃣ = 600 Wei)
                  </Typography>
                </Typography>
                <Typography component='div' variant="h5" color="textPrimary" className={classes.steps}>
                  How to Play
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary">
                  Step 1
                  <Typography variant="subtitle1" color="textSecondary">
                    Enter the values 1, 2 or 3 for the amount of Wei that you want to bet and press start.
                  </Typography>
                  <img alt="Step 1 Game" className={classes.picture} src={process.env.PUBLIC_URL + "/game_1.png"}/>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary">
                  Step 2
                  <Typography variant="subtitle1" color="textSecondary">
                    When prompted by MetaMask, press confirm.
                  </Typography>
                  <img alt="Step 2 Game" className={classes.picture} src={process.env.PUBLIC_URL + "/game_2.png"}/>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary">
                  Step 3
                  <Typography variant="subtitle1" color="textSecondary">
                    Results will be displayed on the website after the transation has been mined.
                  </Typography>
                  <img alt="Step 3 Game" className={classes.picture} src={process.env.PUBLIC_URL + "/game_3.png"}/>
                </Typography>
              </Box>
            </React.Fragment>
          }
        </Box>
      </Box>
    </Fade>
  )
}

export default Instruction;