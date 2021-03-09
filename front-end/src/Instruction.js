import 'fontsource-roboto';
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from '@material-ui/core/styles/makeStyles';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
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
  steps: {
    marginTop: theme.spacing(2),
  },
}));

function Instruction({showInstr}) {
  const classes = useStyles();
  if(!showInstr) {
    return <span></span>
  }
  return (
    <Fade in={true} timeout={400}>
      <Box mt={10} mb={4}>
        <CssBaseline /> 
        <Box component={Container} className={classes.instruction_container} boxShadow={5} textAlign="left">
          {/* MetaMask */}
          <Box textAlign="center">
            <Typography variant="h4" color="primary">
              MetaMask Setup
            </Typography>
          </Box>
          <Typography variant="h6" color="textPrimary" className={classes.steps}>
            Step 1
            <Typography variant="subtitle1" color="textSecondary">
              You do this first.
            </Typography>
          </Typography>
          <Typography variant="h6" color="textPrimary" className={classes.steps}>
            Step 2
            <Typography variant="subtitle1" color="textSecondary">
              You do this second.
            </Typography>
          </Typography>
          <Typography variant="h6" color="textPrimary" className={classes.steps}>
            Step 3
            <Typography variant="subtitle1" color="textSecondary">
              You do this third.
            </Typography>
          </Typography>
        </Box>
        <Box component={Container} className={classes.instruction_container} boxShadow={5} textAlign="left" mt={4}>
          {/* Game Instruction */}
          <Box textAlign="center">
            <Typography variant="h4" color="secondary">
              Game Instructions
            </Typography>
          </Box>
          <Typography variant="h6" color="textPrimary" className={classes.steps}>
            Step 1
            <Typography variant="subtitle1" color="textSecondary">
              You do this first.
            </Typography>
          </Typography>
          <Typography variant="h6" color="textPrimary" className={classes.steps}>
            Step 2
            <Typography variant="subtitle1" color="textSecondary">
              You do this second.
            </Typography>
          </Typography>
          <Typography variant="h6" color="textPrimary" className={classes.steps}>
            Step 3
            <Typography variant="subtitle1" color="textSecondary">
              You do this third.
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Fade>
  )
}

export default Instruction;