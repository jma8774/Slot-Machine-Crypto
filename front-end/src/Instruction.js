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
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  instruction_container: {
    position: "relative",
    backgroundColor: theme.palette.grey[900],
    borderRadius: theme.shape.borderRadius,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    maxWidth: 960,
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
    },
  },
  titleAlignLeft: {
    position: "absolute",
    left: theme.spacing(3),
    bottom: theme.spacing(4),

  },
  steps: {
    marginTop: theme.spacing(2),
  },
}));

function Instruction({showInstr}) {
  const classes = useStyles();
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
                    Install the MetaMask extension from <Link href="https://metamask.io/download.html" target="_blank" rel="noreferrer" color="secondary">here</Link>.
                  </Typography>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 2
                  <Typography variant="subtitle1" color="textSecondary">
                    After installing, in the new pop up window, click "Create a Wallet".
                  </Typography>
                  <img alt="Step 2 MetaMask" src={process.env.PUBLIC_URL + "/metamask_2.png"}/>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 3
                  <Typography variant="subtitle1" color="textSecondary">
                    Secret Backup Phrase should be saved in case you lose your account.
                  </Typography>
                  <img alt="Step 3 MetaMask" src={process.env.PUBLIC_URL + "/metamask_3.png"}/>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 4
                  <Typography variant="subtitle1" color="textSecondary">
                    Click on the MetaMask extension located at the top right and switch from the Ethereum Mainnet to the Kovan Test Network. 
                  </Typography>
                  <img alt="Step 4 MetaMask" src={process.env.PUBLIC_URL + "/metamask_4.png"}/>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 5
                  <Typography variant="subtitle1" color="textSecondary">
                    To get testing Ethereum, we head to the <Link href="https://gitter.im/kovan-testnet/faucet" target="_blank" rel="noreferrer" color="secondary">faucet</Link>. 
                    Then, copy the account address and paste it into the faucet chatroom. (It can take up to a minute or more to receive your 6 Ethereum)
                  </Typography>
                  <img alt="Step 5 MetaMask" src={process.env.PUBLIC_URL + "/metamask_5.png"}/>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 6
                  <Typography variant="subtitle1" color="textSecondary">
                    Refresh the website and if prompted, connect your Etherum wallet to this website.
                  </Typography>
                  <img alt="Step 6 MetaMask" src={process.env.PUBLIC_URL + "/metamask_6.png"}/>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 7
                  <Typography variant="subtitle1" color="textSecondary">
                    Refresh the website and you should receieve a success message.
                  </Typography>
                  <img alt="Step 7 MetaMask" src={process.env.PUBLIC_URL + "/metamask_7.png"}/>
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
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 1
                  <Typography variant="subtitle1" color="textSecondary">
                    You do this first.
                  </Typography>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 2
                  <Typography variant="subtitle1" color="textSecondary">
                    You do this second.
                  </Typography>
                </Typography>
                <Typography component='div' variant="h6" color="textPrimary" className={classes.steps}>
                  Step 3
                  <Typography variant="subtitle1" color="textSecondary">
                    You do this third.
                  </Typography>
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