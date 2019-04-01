import { StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Moment } from 'moment-timezone/moment-timezone';
import React, { Component } from 'react';
import CalendarContainer from './components/calendar/CalendarContainer';
import CalendarBar from './components/CalendarBar';
import DayContainer from './components/day/DayContainer';
import moment from 'moment-timezone/moment-timezone';
import { withSnackbar } from 'notistack';

const styles = (theme: Theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    maxWidth: theme.spacing.unit * 10 * 10,
    margin: '0 auto',
  },
  header: {

  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
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

  handlePrevMonth = () => {
    this.setState({
      selectedDay: this.state.selectedDay.subtract(1, 'month'),
    });
  };

  handleNextMonth = () => {
    this.setState({
      selectedDay: this.state.selectedDay.add(1, 'month'),
    });
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
          <CalendarContainer selectedDay={selectedDay} onChange={this.handleChangeSelectedDay} />
          <CalendarBar selectedDay={selectedDay} onNext={this.handleNextMonth} onPrev={this.handlePrevMonth} />
          <DayContainer selectedDay={selectedDay} />
        </div>
      </div>
    );
  }
}

// @ts-ignore
export default withStyles(styles)(withSnackbar(App));
