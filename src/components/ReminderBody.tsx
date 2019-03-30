import React, { ChangeEvent } from 'react';
import { StyledComponentProps, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: theme.spacing.unit * 10 * 4,
  },
});

export interface ReminderBodyProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  value: string;

  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

class ReminderBody extends React.Component<ReminderBodyProps> {
  render() {
    const { classes, value, onChange } = this.props;

    if (!classes) {
      throw new Error(`error loading styles`);
    }

    return (
      <FormControl className={classes.root}>
        <TextField
          id="outlined-multiline-flexible"
          label="Reminder body"
          multiline
          rowsMax="4"
          value={value}
          onChange={onChange}
          className={classes.textField}
          margin="normal"
          helperText="What?"
          variant="outlined"
        />
      </FormControl>
    );
  }
}

// @ts-ignore
export default withStyles(styles)(ReminderBody);
