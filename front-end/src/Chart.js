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

function Chart({data}) {
  return (
    <Container>
      <Box pt={2} pb={1}>
        <Typography component="h1" variant="h6" color="primary">
          <Box fontWeight="fontWeightBold">Today</Box>
        </Typography>
      </Box>
      <ResponsiveContainer width="99%" aspect={3}>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 25,
            bottom: -12,
            left: 11,
          }}
        >
          <XAxis dataKey="time" stroke={greenTheme.palette.text.secondary} />
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