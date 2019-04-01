import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';
import { StyledComponentProps, Theme, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment-timezone/moment-timezone';
import EventEditorDialog from '../EventEditorDialog';
import { CalendarEvent } from './Day';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  actions: {
    display: 'flex',
  },
  deleteButtonWrapper: {
    margin: theme.spacing.unit * 2,
  },
});

export interface DayEventsProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  list: CalendarEvent[];
}

function DayEvents(props: DayEventsProps) {
  const { classes, list } = props;

  if (!classes) {
    throw new Error(`error loading styles`);
  }

  return (
    <List className={classes.root}>
      {list.map(event => (
        <ListItem key={event.id}>
          <ListItemAvatar>
            <Avatar>
              <Typography variant="overline" gutterBottom>
                {moment(event.time).format('hh:mm')}
              </Typography>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={event.title}
            secondary={
              <Fragment>
                <Typography component="div" color="textPrimary">
                  {event.description}
                </Typography>
                <div className={classes.actions}>
                  <EventEditorDialog event={event} />
                  <div className={classes.deleteButtonWrapper}>
                    <Button variant="outlined" color="primary" onClick={async () => {
                      await fetch(`event?id=${event.id}`, { method: 'DELETE', credentials: 'same-origin' });
                    }}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default withStyles(styles)(DayEvents);
