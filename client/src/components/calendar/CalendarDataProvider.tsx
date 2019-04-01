import React from 'react';
// @ts-ignore
import useFetch from 'fetch-suspense';
import { StyledComponentProps, Theme, withStyles } from '@material-ui/core/styles';
import { Moment } from 'moment-timezone/moment-timezone';
import Calendar from './Calendar';

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

export interface CalendarDataProviderProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  selectedDay: Moment;

  onChange(date: string): void;
}

function CalendarDataProvider(props: CalendarDataProviderProps) {
  const { classes, selectedDay, onChange } = props;
  const { data }: { data: Day[]; } = useFetch(`/calendar?month=${selectedDay.format('YYYY-MM')}`, { method: 'GET' });

  if (!classes) {
    throw new Error(`error loading styles`);
  }

  return (
    <Calendar selectedDay={selectedDay} list={data} onChange={onChange} />
  )
}

// @ts-ignore
export default withStyles(styles)(CalendarDataProvider);
