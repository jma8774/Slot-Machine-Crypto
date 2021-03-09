import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

const greenTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#4dabf5'},
  },
});

function Chart({data, curTime}) {
  return (
    <Container>
      <Box pt={2} pb={1}>
        <Typography component="h1" variant="h6" color="primary">
          <Box fontWeight="fontWeightBold">Today</Box>
          <Typography component="div" variant="subtitle2" color="textSecondary">
            Starting from {curTime}
          </Typography>
        </Typography>
      </Box>
      <ResponsiveContainer width="99%" aspect={3}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 35,
            bottom: -18,
            left: 11,
          }}
        >
          <XAxis dataKey="time" tick={false} stroke={greenTheme.palette.text.secondary} />
          <YAxis stroke={greenTheme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: greenTheme.palette.text.primary }}
            >
              Earnings (ETH)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={greenTheme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default Chart;