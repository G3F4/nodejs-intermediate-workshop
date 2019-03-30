import React from 'react';
import { StyledComponentProps, Theme, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ReminderItem } from '../App';
import moment from 'moment-timezone/moment-timezone';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

export interface RemindersListProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  list: ReminderItem[];
}

function RemindersList(props: RemindersListProps) {
  const { classes, list } = props;


  if (!classes) {
    throw new Error(`error loading styles`);
  }

  return (
    <List className={classes.root}>
      {list.map((reminder, index) => (
        <ListItem key={index}>
          <ListItemText primary={reminder.body} secondary={moment(reminder.time).format('YYYY MM DD, hh:mm')} />
        </ListItem>
      ))}
    </List>
  );
}

export default withStyles(styles)(RemindersList);
