import { StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import { Moment } from 'moment-timezone/moment-timezone';
import React, { ChangeEvent, Component } from 'react';
import ReminderTime from './components/ReminderTime';
import ReminderBody from './components/ReminderBody';
import Typography from '@material-ui/core/Typography/Typography';
import RemindButton from './components/RemindButton';
import RemindersTabs from './components/RemindersTabs';
import moment from 'moment-timezone/moment-timezone';
import { withSnackbar } from 'notistack';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  header: {
    margin: theme.spacing.unit * 2,
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
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

export type ReminderItemStatus = 'PENDING' | 'SEND';

export interface ReminderItem {
  status: ReminderItemStatus;
  time: Moment;
  body: string;
}

interface State {
  reminders: {
    pending: ReminderItem[];
    send: ReminderItem[];
  };
  time: Moment;
  body: string;
}

class App extends Component<AppProps, State> {
  state: State = {
    body: '',
    time: moment(Date.now()),
    reminders: {
      pending: [],
      send: [],
    },
  };

  componentDidMount() {
    setInterval(() => {
      const { reminders } = this.state;

      if (reminders.pending.length > 0) {
        const lastPendingReminder = reminders.pending[reminders.pending.length - 1];

        this.setState({
          reminders: {
            ...reminders,
            pending: reminders.pending.slice(0, reminders.pending.length - 2),
            send: [
              ...reminders.send,
              { ...lastPendingReminder, status: 'SEND' }
            ],
          },
        });

        this.props.enqueueSnackbar(`Notification was send. Body: ${lastPendingReminder.body}`);
      }
    }, 10000)
  }

  handleReminderBodyChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      body: event.target.value,
    })
  };

  handleReminderTimeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      time: moment(event.target.value),
    })
  };

  handleRemindButtonClick = (): void => {
    const { body, time, reminders } = this.state;

    this.setState({
      body: '',
      time: moment(Date.now()),
      reminders: {
        ...reminders,
        pending: [
          ...reminders.pending,
          { body, time, status: 'PENDING' }
        ],
      },
    });

    this.props.enqueueSnackbar('New reminder saved!');
  };

  render() {
    const { classes } = this.props;
    const { body, reminders, time } = this.state;

    if (!classes) {
      throw new Error(`error loading styles`);
    }

    return (
      <div className={classes.root}>
        <header className={classes.header}>
          <Typography component="h1" variant="h2" gutterBottom>Reminder</Typography>
        </header>
        <div className={classes.content}>
          <ReminderTime value={time} onChange={this.handleReminderTimeChange} />
          <ReminderBody value={body} onChange={this.handleReminderBodyChange} />
          <RemindButton onClick={this.handleRemindButtonClick} />
          <RemindersTabs reminders={reminders} />
        </div>
      </div>
    );
  }
}

// @ts-ignore
export default withStyles(styles)(withSnackbar(App));
