import React from 'react';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

const greenRedTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#4caf50'},
    secondary: { main: '#f44336'},
  },
});

function History({rows}) {
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
          <ThemeProvider theme={greenRedTheme}>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.outcome}</TableCell>
                  <TableCell>
                    <Chip
                        label={row.status}
                        icon={row.status === "Win" ? <DoneIcon /> : <CloseIcon />}
                        color={row.status === "Win" ? "primary" : "secondary"}
                        variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{row.fee}</TableCell>
                  <TableCell align="right">
                    <Typography color={row.profit > 0 ? "primary" : "secondary"}>
                      {row.profit}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ThemeProvider>
        </Table>
      </Box>
    </Container>
  )
}

export default History;