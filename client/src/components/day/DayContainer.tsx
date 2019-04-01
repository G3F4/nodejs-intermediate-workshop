import React, { Suspense } from 'react';
// @ts-ignore
import { StyledComponentProps, Theme, withStyles } from '@material-ui/core/styles';
import { Moment } from 'moment-timezone/moment-timezone';
import Day from './Day';

const styles = (_theme: Theme) => ({
  root: {
    display: 'flex',
  },
});

export interface CalendarContainerProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  selectedDay: Moment;
}

function DayContainer(props: CalendarContainerProps) {
  const { classes, selectedDay } = props;

  if (!classes) {
    throw new Error(`error loading styles`);
  }

  return (
    <div className={classes.root}>
      <Suspense fallback="Loading...">
        <Day selectedDay={selectedDay} />
      </Suspense>
    </div>
  );
}

// @ts-ignore
export default withStyles(styles)(DayContainer);
