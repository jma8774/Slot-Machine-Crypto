import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { PieChart, Pie, Sector } from "recharts";
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  pieStyle: {
    position: "relative",
    left: -theme.spacing(4),
    top: -theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      left: -theme.spacing(2),
    },
  }
}));

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

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={5} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

function Balance({profit, winRate, startDate}) {
  const classes = useStyles();
  const [month, date, year] = startDate.toLocaleDateString("en-US").split("/")

  const [index, setIndex] = React.useState(0);
  const data = winRate === null
    ? [{ name: "No Games", value: 100 }]
    : [
        {name: "Win", value: winRate},
        {name: "Lose", value: 100-winRate}
      ]
  const onPieEnter = (_, index) => {
    setIndex(index)
  };

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
    
    <PieChart width={400} height={400} margin={{top: 55, left: 70}} className={classes.pieStyle}>
      <Pie
        activeIndex={index}
        activeShape={renderActiveShape}
        data={data}
        cx="120"
        cy="80"
        innerRadius={40}
        outerRadius={55}
        fill="#44a0e6"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
    </Container>
  )
}

export default Balance;