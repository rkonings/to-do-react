import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    DatePickerWeek: {
        display: 'table-row',

    },
   
});

const DatePickerWeek = (props) => {
    const { classes } = props;
    return (
        <div className={classes.DatePickerWeek}>
            {props.children}
        </div>
    );
}

export default withStyles(styles)( DatePickerWeek );