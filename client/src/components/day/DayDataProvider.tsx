import React from 'react';
// @ts-ignore
import useFetch from 'fetch-suspense';
import { Moment } from 'moment-timezone/moment-timezone';
import Day from './Day';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  notification: boolean;
}

export interface DayProps {
  selectedDay: Moment;
}

export default function DayDataProvider({ selectedDay }: DayProps) {
  const { data }: { data: CalendarEvent[]; } = useFetch(`/day?date=${selectedDay.format('YYYY-MM-DD')}`, { method: 'GET' });

  return (
    <Day list={data} />
  );
}
