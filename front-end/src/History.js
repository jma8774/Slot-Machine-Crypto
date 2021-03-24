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
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  removeBottom: {
    borderBottom: "none",
  },
  rowHeight: {
    height: theme.spacing(10),
  },
}));

const greenRedTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#4caf50'},
    secondary: { main: '#f44336'},
  },
});

function History({rows, page, setPage}) {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - (rows.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Box pt={2} pb={1}>
        <Typography component="h1" variant="h6" color="primary">
          <Box fontWeight="fontWeightBold">History</Box>
        </Typography>
      </Box>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Winning Outcome</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell align="right">Profit</TableCell>
            </TableRow>
          </TableHead>
          <ThemeProvider theme={greenRedTheme}>
            <TableBody>
              {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
              ).map((row) => (
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
                    <Typography color={row.profit < 0 ? "secondary" : "primary"}>
                      {row.profit}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 65 * emptyRows}}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination 
                  className={classes.removeBottom}
                  rowsPerPageOptions={[5, 10, 15]} 
                  count={rows.length}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </ThemeProvider>
        </Table>
      </Box>
    </Container>
  )
}

export default History;