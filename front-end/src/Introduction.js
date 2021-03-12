import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

function Introduction({showInstruction, showGame}) {
  return (
    <Box mt={10}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
          Cryptocurrency Slot Machine
        </Typography>
        <Box py={2}>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Cryptocurrency is the future, that's why we built an online anonymous slot machine that uses Ether as payment.
            This website utilizes MetaMask to access player's crypto wallets and the Kovan Test Network, an alternative to the Etherum Mainnet, for testing.
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

export default Introduction;