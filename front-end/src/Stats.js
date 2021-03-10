import 'fontsource-roboto';
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Fade from '@material-ui/core/Fade';
import Chart from './Chart';
import Balance from './Balance';
import History from './History';

const statTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#4dabf5'},
  },
});

const useStyles = makeStyles((theme) => ({
  stat_paper: {
    height: 300,
    backgroundColor: theme.palette.grey[900],
    textAlign: 'left',
  },
  stat_history: {
    backgroundColor: theme.palette.grey[900],
    textAlign: 'left',
  },
}));

function Stats({showGame, chartData, historyData, profit, curDate, startTime}) {
  const classes = useStyles();
  if(!showGame) {
    return <span></span>
  }
  return (
    <ThemeProvider theme={statTheme}>
      <Fade in={true} timeout={400}>
        <Box mt={10} mb={10}>
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
                      <Chart data={chartData} curTime={startTime}/>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Paper className={classes.stat_paper} elevation={3}>
                      <Balance profit={profit} curDate={curDate}/>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Paper className={classes.stat_history} elevation={3}>
                      <History rows={historyData}/>
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

export default Stats;