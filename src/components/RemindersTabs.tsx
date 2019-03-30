import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledComponentProps, Theme, withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { ReminderItem } from '../App';
import RemindersList from './RemindersList';

function TabContainer({ children, dir }: { children: React.ReactNode, dir: string }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: theme.spacing.unit * 10 * 4,
  },
});

export interface RemindersTabsProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  reminders: {
    pending: ReminderItem[];
    send: ReminderItem[];
  };

  theme: Theme;
}

interface State {
  value: number;
}

class RemindersTabs extends Component<RemindersTabsProps, State> {
  state = {
    value: 0,
  };

  handleChange = (event: React.ChangeEvent<{}>, value: any): void => {
    this.setState({ value });
  };

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme, reminders } = this.props;

    if (!classes) {
      throw new Error(`error loading styles`);
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Future" />
            <Tab label="Past" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <RemindersList list={reminders.pending} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <RemindersList list={reminders.send} />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

// @ts-ignore
export default withStyles(styles, { withTheme: true })(RemindersTabs);
