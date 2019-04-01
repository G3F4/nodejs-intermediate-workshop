import { Card } from '@material-ui/core';
import React, { Suspense } from 'react';
// @ts-ignore
import { StyledComponentProps, Theme, withStyles } from '@material-ui/core/styles';
import { Moment } from 'moment-timezone/moment-timezone';
import Calendar from './Calendar';

const styles = (theme: Theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '14.28% 14.28% 14.28% 14.28% 14.28% 14.28% 14.28%',
    gridTemplateRows: '16.66% 16.66% 16.66% 16.66% 16.66% 16.66%%',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

export interface CalendarContainerProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  selectedDay: Moment;

  onChange(date: string): void;
}

function CalendarContainer(props: CalendarContainerProps) {
  const { classes, selectedDay, onChange } = props;

  if (!classes) {
    throw new Error(`error loading styles`);
  }

  return (
    <Card className={classes.root}>
      <Suspense fallback="Loading...">
        <Calendar onChange={onChange} selectedDay={selectedDay} />
      </Suspense>
    </Card>
  );
}

// @ts-ignore
export default withStyles(styles)(CalendarContainer);
