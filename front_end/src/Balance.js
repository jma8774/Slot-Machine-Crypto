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

function Balance({profit}) {
  return (
    <Container>
      <Box pt={2} pb={1}>
        <Typography component="h1" variant="h6" color="primary">
          <Box fontWeight="fontWeightBold">Total Winnings</Box>
        </Typography>
      </Box>
      <ThemeProvider theme={greenTheme}>
        <Typography component="p" variant="h5" color={profit > 0 ? "primary" : "error"}>
          {profit} ETH
        </Typography>
      </ThemeProvider>
      <Typography color="textSecondary">
        on 15 March, 2019
      </Typography>
    </Container>
  )
}

export default Balance;