import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
    DatePickerDay: {
        display: 'table-cell',
        textAlign: 'center',
        verticalAlign: 'middle',
        padding: 15,
        borderTop: '1px solid ' + theme.palette.grey[100],
        borderLeft: '1px solid ' + theme.palette.grey[100],
        '&:hover': {
            background: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
        },
        '&:first-child': {
            borderLeft: 'none',
        }
        
    },
    Active: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    NotInSelectedMonth: {
        color: '#ccc',
    },
    InSelectedMonth: {

    }


    
});

const DatePickerDay = (props) => {
    const { classes, selected, inSelectedMonth } = props;
    const classnames = classNames(
        classes.DatePickerDay,
        {
            [classes.Active]: (selected),
            [classes.InSelectedMonth]: (inSelectedMonth),
            [classes.NotInSelectedMonth]: (!inSelectedMonth),
        });

    return (
        <div onClick={() => props.onClick(props.date)} className={classnames}>
            {props.children}
        </div>
    );
}

export default withStyles(styles)( DatePickerDay );
