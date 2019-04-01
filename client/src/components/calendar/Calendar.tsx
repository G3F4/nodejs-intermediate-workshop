import { Card } from '@material-ui/core';
import React, { Fragment } from 'react';
import classnames from 'classnames';
// @ts-ignore
import useFetch from 'fetch-suspense';
import { StyledComponentProps, Theme, withStyles } from '@material-ui/core/styles';
import { Moment } from 'moment-timezone/moment-timezone';
import Typography from '@material-ui/core/Typography';
import moment from 'moment-timezone/moment-timezone';

export const DAYS = ['Mon', 'Thu', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];

const styles = (theme: Theme) => ({
  day: {
    border: 'solid 1px #eee',
    color: theme.palette.text.secondary,
    '&:hover': {
      background: '#eee',
    },
  },
  selected: {
    background: '#eee',
  },
  eventTitle: {
    whiteSpace: 'nowrap',
  },
});

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  time: Moment;
}

export interface Day {
  date: string;
  events: CalendarEvent[];
}

export interface CalendarProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  selectedDay: Moment;

  onChange(date: string): void;
}

const isDaySelected = (selectedDay: Moment, date: string) => selectedDay.isSame(moment(date), 'day');

function Calendar(props: CalendarProps) {
  const { classes, selectedDay, onChange } = props;
  const { data }: { data: Day[]; } = useFetch(`/calendar?month=${selectedDay.format('YYYY-MM')}`, { method: 'GET' });

  if (!classes) {
    throw new Error(`error loading styles`);
  }

  return (
    <Fragment>
      {DAYS.map(day => (
        <Card key={day}>
          <Typography variant="h6" gutterBottom>
            {day}
          </Typography>
        </Card>
      ))}
      {data.map(({ date, events }) => (
        <Card
          key={date}
          className={classnames({
            [(classes.selected as string)]: isDaySelected(selectedDay, date),
          }, classes.day)}
          onClick={() => onChange(date)}
        >
          <Typography variant="h6" gutterBottom>
            {moment(date).format('DD')}
          </Typography>
          <div>
            {Array.from({ length: 3 }).map((_, index) => (
              <Typography
                variant="caption"
                key={events[index] ? events[index].id : index}
                className={classes.eventTitle}
                gutterBottom
              >
                {events[index] ? events[index].title : <div>&nbsp;</div>}
              </Typography>
            ))}
          </div>
        </Card>
      ))}
    </Fragment>
  )
}

// @ts-ignore
export default withStyles(styles)(Calendar);
