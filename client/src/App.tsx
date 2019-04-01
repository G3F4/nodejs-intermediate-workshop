import { StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { Moment } from 'moment-timezone/moment-timezone';
import React, { Component } from 'react';
import CalendarContainer from './components/calendar/CalendarContainer';
import DayContainer from './components/day/DayContainer';
import moment from 'moment-timezone/moment-timezone';
import { withSnackbar } from 'notistack';
import EventEditorDialog from './components/EventEditorDialog';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    maxWidth: theme.spacing.unit * 10 * 10,
    margin: '0 auto',
  },
  header: {

  },
  content: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  }
});

export interface AppProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  enqueueSnackbar(message: string): void;
}

interface State {
  selectedDay: Moment;
}

class App extends Component<AppProps, State> {
  state: State = {
    selectedDay: moment(Date.now()),
  };

  handleChangeSelectedDay = (date: string) => {
    this.setState({ selectedDay: moment(date) })
  };

  render() {
    const { classes } = this.props;
    const { selectedDay } = this.state;

    if (!classes) {
      throw new Error(`error loading styles`);
    }

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h2" gutterBottom className={classes.header}>
            {moment(selectedDay).format('MMMM')}
          </Typography>
          <AppBar position="static" color="default">
            <Tabs
              value={null}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab
                label={moment(selectedDay).subtract(1, 'month').format('MMMM')}
                onClick={() => {
                  this.setState({
                    selectedDay: selectedDay.subtract(1, 'month'),
                  })
                }}
              />
              <Tab
                label={moment(selectedDay).add(1, 'month').format('MMMM')}
                onClick={() => {
                  this.setState({
                    selectedDay: selectedDay.add(1, 'month'),
                  })
                }}
              />
            </Tabs>
          </AppBar>
          <CalendarContainer selectedDay={selectedDay} onChange={this.handleChangeSelectedDay} />
          <EventEditorDialog selectedDay={selectedDay} />
          <DayContainer selectedDay={selectedDay} />
        </div>
      </div>
    );
  }
}

// @ts-ignore
export default withStyles(styles)(withSnackbar(App));
