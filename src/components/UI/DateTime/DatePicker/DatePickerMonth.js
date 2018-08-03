import React from 'react';
import Moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import DatePickerDay from './DatePickerDay';
import DatePickerWeek from './DatePickerWeek';

const styles = theme => ({

    CalendarHeader: {
        display: 'table-row',
    },
    CalendarHeaderItem:{
        display: 'table-cell',
        textAlign: 'center',
        verticalAlign: 'middle',
        padding: 15,
    },

    
});


const DatePickerMonth = (props) => {
        const date      = Moment(props.date).isValid() ? Moment(props.date) : Moment();
        const { classes } = props;

        let calendar    = [];
        let week        = [];
        const start     = date.clone().startOf('month').startOf('isoWeek');
        //const end       = date.clone().endOf('month').endOf('isoWeek');
        const end       = date.clone().startOf('month').endOf('isoWeek').add(5,'w');
        const index     = start.clone().subtract(1,'d');
        const selected  = Moment(props.selected).isValid() ? Moment(props.selected) : null;

        while (index.isBefore(end, 'day')) {
            index.add(1,'d');
            week.push( createDay( index, selected, date.month(), props.onChange ));

            if(index.isoWeekday() === 7){
                calendar.push(
                    <DatePickerWeek key={index.isoWeek()}>{week}</DatePickerWeek>
                );
                week = [];
            }   
        }
    
        return (
            <React.Fragment>    
                <div className={classes.CalendarHeader}>
                    <div className={classes.CalendarHeaderItem}>Mo</div>
                    <div className={classes.CalendarHeaderItem}>Tu</div>
                    <div className={classes.CalendarHeaderItem}>We</div>
                    <div className={classes.CalendarHeaderItem}>Th</div>
                    <div className={classes.CalendarHeaderItem}>Fr</div>
                    <div className={classes.CalendarHeaderItem}>Sa</div>
                    <div className={classes.CalendarHeaderItem}>Su</div>
                </div>
                {calendar}
            </React.Fragment>
        
        );
}

const createDay = (date, selectedDate, _inSelectedMonth, onClickHandler) => {

    const selected = (
        selectedDate && 
        Number(selectedDate.format('D')) === Number(date.format('D')) && 
        Number(selectedDate.format('M')) === Number(date.format('M'))
    );

    const inSelectedMonth = _inSelectedMonth === date.month();

    return (
        <DatePickerDay 
            selected={selected} 
            inSelectedMonth={inSelectedMonth}
            date={date.toObject()}
            onClick={onClickHandler} 
            key={date.format('Y-M-D')}>{date.format('D')}</DatePickerDay>
    );
}


export default withStyles(styles)(DatePickerMonth);