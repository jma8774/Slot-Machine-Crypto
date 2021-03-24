import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const greenTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#4caf50'},
  },
});

function monthToString(month) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[month-1]
}

function Balance({profit, startDate}) {
  const [month, date, year] = startDate.toLocaleDateString("en-US").split("/")
  return (
    <Container>
      <Box pt={2}>
        <Typography component="h1" variant="h6" color="primary">
          <Box fontWeight="fontWeightBold">Total Winnings</Box>
        </Typography>
      </Box>
      <ThemeProvider theme={greenTheme}>
        <Typography component="p" variant="h5" color={profit >= 0 ? "primary" : "error"}>
          {profit} Wei
        </Typography>
      </ThemeProvider>
      <Typography color="textSecondary">
        since {monthToString(month)} {date}, {year}
      </Typography>
    </Container>
  )
}

export default Balance;