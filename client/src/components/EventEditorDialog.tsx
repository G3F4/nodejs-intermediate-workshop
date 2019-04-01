import { StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { Add, Edit } from '@material-ui/icons';
import React, { ChangeEvent, Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { CalendarEvent } from './day/DayDataProvider';
import moment, { Moment } from 'moment-timezone/moment-timezone';

const styles = (theme: Theme) => ({
  root: {
    margin: theme.spacing.unit * 2,
  },
  dialogContent: {
    minWidth: theme.spacing.unit * 10 * 5,
  },
  firstRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export interface EventEditorDialogProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  fullScreen?: boolean;
  event?: CalendarEvent;
  selectedDay?: Moment;
  fabButtonClassName?: string;
}

interface State {
  open: boolean;
  event: Partial<CalendarEvent>;
}

class EventEditorDialog extends Component<EventEditorDialogProps, State> {
  state = {
    open: false,
    event: this.props.event || { title: '', description: '', time: moment(this.props.selectedDay).format('YYYY-MM-DDThh:mm'), notification: false },
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleEventTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      event: {
        ...this.state.event,
        time: moment(event.target.value).format('YYYY-MM-DDThh:mm'),
      }
    });
  };

  handleEventTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      event: {
        ...this.state.event,
        title: event.target.value,
      }
    });
  };

  handleEventDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      event: {
        ...this.state.event,
        description: event.target.value,
      }
    });
  };

  handleEventNotificationChange = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({
      event: {
        ...this.state.event,
        notification: checked,
      }
    });
  };

  handleSave = async () => {
    if (this.props.event) {
      const { status } = await fetch(`event?id=${this.props.event.id}`, {
        credentials: 'same-origin',
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.event),
      });

      if (status === 200) {
        this.handleClose();
      }
    } else {
      const { status } = await fetch('event', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.event),
      });

      if (status === 201) {
        this.handleClose();
      }
    }
  };

  render() {
    const { classes, fullScreen, event, fabButtonClassName } = this.props;
    const { open, event: { description, time, title, notification } } = this.state;

    if (!classes) {
      throw new Error(`error loading styles`);
    }

    return (
      <div className={classes.root}>
        <Fab color="secondary" aria-label="Open editor" onClick={this.handleClickOpen} className={fabButtonClassName}>
          {event ? <Edit /> : <Add />}
        </Fab>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
        >
          <DialogContent className={classes.dialogContent}>
            <div className={classes.firstRow}>
              <TextField
                value={time}
                onChange={this.handleEventTimeChange}
                label="Time"
                type="datetime-local"
                placeholder="Enter event time"
                helperText="Event time"
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControlLabel
                control={
                  <Switch
                    onChange={this.handleEventNotificationChange}
                    checked={notification}
                    value="notification"
                    color="primary"
                  />
                }
                label="Notification"
              />
            </div>
            <TextField
              value={title}
              onChange={this.handleEventTitleChange}
              label="Title"
              placeholder="Enter event title"
              helperText="Event title"
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              value={description}
              onChange={this.handleEventDescriptionChange}
              label="Description"
              placeholder="Enter event description"
              helperText="Event description"
              margin="normal"
              variant="outlined"
              rows="4"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              multiline
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(withMobileDialog<EventEditorDialogProps>({ breakpoint: 'xs' })(EventEditorDialog));
