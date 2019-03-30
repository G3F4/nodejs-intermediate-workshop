import React, { ChangeEvent } from 'react';
import { StyledComponentProps, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment, { Moment } from 'moment-timezone/moment-timezone';
import FormControl from '@material-ui/core/FormControl';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: theme.spacing.unit * 10 * 3,
  },
});

export interface ReminderTimeProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  value: Moment;

  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

function ReminderTime(props: ReminderTimeProps) {
  const { classes, value, onChange } = props;

  if (!classes) {
    throw new Error(`error loading styles`);
  }

  return (
    <FormControl className={classes.root}>
      <TextField
        onChange={onChange}
        value={value.format('YYYY-MM-DDThh:mm')}
        id="datetime-local"
        label="Remind time"
        type="datetime-local"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </FormControl>
  );
}

// @ts-ignore
export default withStyles(styles)(ReminderTime);
