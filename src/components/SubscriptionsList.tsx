import { ListItemAvatar } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Delete, Computer, Phone, HelpOutline } from '@material-ui/icons';
import React from 'react';
import { StyledComponentProps, Theme, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const DEVICE_ICON_MAP: { [key: string]: any } = {
  Desktop: Computer,
  Mobile: Phone,
};

const SUBSCRIPTION_MOCK = [
  { id: '1', device: 'Desktop', browser: 'Chrome' },
  { id: '2', device: 'Mobile', browser: 'Samsung Internet Browser' },
];

export interface Subscription {
  id: string;
  device: string;
  browser: string;
}

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

export interface SubscriptionsListProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  list?: Subscription[];
}

function SubscriptionsList(props: SubscriptionsListProps) {
  const { classes, list = SUBSCRIPTION_MOCK } = props;


  if (!classes) {
    throw new Error(`error loading styles`);
  }

  return (
    <List className={classes.root}>
      {list.map((subscription, index) => {
        const Icon = DEVICE_ICON_MAP[subscription.device];

        return (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>
                <Icon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={subscription.browser}
            />
            <ListItemSecondaryAction>
              <IconButton aria-label="Delete">
                <Delete />
              </IconButton>
              <IconButton aria-label="Test">
                <HelpOutline />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

export default withStyles(styles)(SubscriptionsList);
