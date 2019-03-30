import React from 'react';
import { StyledComponentProps, Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

export interface RemindButtonProps extends StyledComponentProps<keyof ReturnType<typeof styles>> {
  onClick(): void;
}

function RemindButton(props: RemindButtonProps) {
  const { classes, onClick } = props;

  if (!classes) {
    throw new Error(`error loading styles`);
  }

  return (
    <div className={classes.root}>
      <Button onClick={onClick} variant="contained" color="primary" className={classes.button}>
        Remind me!
      </Button>
    </div>
  );
}

// @ts-ignore
export default withStyles(styles)(RemindButton);
