import { StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { Moment } from 'moment';
import moment from 'moment-timezone/moment-timezone';
import React from 'react';
import { Day } from './calendar/Calendar';
import EventEditorDialog from './EventEditorDialog';

const styles = (theme: Theme) => ({
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
    top: theme.spacing.unit * -1,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

export interface CalendarBarProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  list: Day[];
  selectedDay: Moment;

  onNext(): void;
  onPrev(): void;
}

const CalendarBar = ({ classes, selectedDay, onPrev, onNext }: CalendarBarProps) => classes && (
  <AppBar position="relative" color="primary" className={classes.appBar}>
    <Toolbar className={classes.toolbar}>
      <Button color="inherit" aria-label="previous month" onClick={onPrev}>
        {moment(selectedDay).subtract(1, 'month').format('MMMM')}
      </Button>
      <EventEditorDialog selectedDay={selectedDay} fabButtonClassName={classes.fabButton}/>
      <div>
        <Button color="inherit" aria-label="next month" onClick={onNext}>
          {moment(selectedDay).add(1, 'month').format('MMMM')}
        </Button>
      </div>
    </Toolbar>
  </AppBar>
);

// @ts-ignore
export default withStyles(styles)(CalendarBar);
