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
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const emojis = ['🍎','🔁','🍒','🍌','🍇','🍊','7️⃣']

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

function TablePaginationActions(props) {
  const classes = useStyles();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {<FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {<KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {<KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {<LastPageIcon />}
      </IconButton>
    </div>
  );
}

function formatGrid(grid) {
  var emojiStr = []
  grid.forEach(row => {
    var tmp = ''
    row.forEach(emojiIdx => {
      tmp += emojis[emojiIdx]
    })
    emojiStr.push(tmp)
  })
  return (
    <Typography variant="h6" align="justify">
      {emojiStr[0]}
      <br/>
      {emojiStr[1]}
      <br/>
      {emojiStr[2]}
    </Typography>
  )
}

function History({rows, page, setPage}) {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - (rows.length - page * rowsPerPage)
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var newRows = [...rows]
  newRows.reverse()

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
              <TableCell>Grid</TableCell>
              <TableCell>Winning Outcome</TableCell>
              <TableCell>Status</TableCell>
              {!xs && <TableCell>Fee</TableCell>}
              <TableCell align="right">Profit</TableCell>
            </TableRow>
          </TableHead>
          <ThemeProvider theme={greenRedTheme}>
            <TableBody>
              {(rowsPerPage > 0
              ? newRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : newRows
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <Tooltip arrow={true} placement="top" title={formatGrid(row.grid)}>
                        <SearchIcon/>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{row.outcome}</TableCell>
                  <TableCell>
                    <Chip
                        label={row.status}
                        icon={row.status === "Win" ? <DoneIcon /> : <CloseIcon />}
                        color={row.status === "Win" ? "primary" : "secondary"}
                        variant="outlined"
                    />
                  </TableCell>
                  {!xs && <TableCell>{row.fee}</TableCell>}
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
                  ActionsComponent={TablePaginationActions}
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