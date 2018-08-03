import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import DatePickerMonth from './DatePicker/DatePickerMonth';
import Moment from 'moment';

const styles = theme => ({
    Paper:{
        position: 'absolute',
        marginBottom: theme.spacing.unit * 2,
        zIndex: 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    DatePickerMonth: {
        display: 'table',
    },
    DatePickerHeader: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    PrevMonth: {
        padding: 10,

    },
    NextMonth: {
        padding: 10,

    },
    CurrentMonth: {
        padding: 10,
    },
    CurrentYear: {
        padding: 10,
    }
});


class DatePicker extends React.Component {

    constructor(props) {
        super(props); 
      
        this.state = {
            date: props.date,
        };
    }

    onChange = (date) => this.props.onChange(date);
 
    prevMonth = () => {
        const date = Moment(this.state.date).subtract(1,'M').toObject();
        this.setState({
            ...this.state,
            date: date,
        });
    }

    nextMonth = () => {
        const date = Moment(this.state.date).add(1,'M').toObject();
        this.setState({
            ...this.state,
            date: date,
        });
    }

    componentWillReceiveProps(props){
        this.setState({
            ...this.state,
            date: props.date,
        });
    }

    render(props){
        const date = Moment(this.state.date).isValid() ? Moment(this.state.date) : Moment();
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.Paper}>

                    <div className={classes.DatePickerHeader}>
                        <div onClick={()=> this.prevMonth()} className={classes.PrevMonth}>Prev</div>
                        <div className={classes.CurrentMonth}>{date.format('M')}</div>
                        <div className={classes.CurrentYear}>{date.format('Y')}</div>
                        <div onClick={()=> this.nextMonth()} className={classes.NextMonth}>Next</div>
                    </div>

                    <div className={classes.DatePickerMonth}>
                        <DatePickerMonth 
                            invalid={this.props.invalid} 
                            onChange={this.onChange} 
                            date={date}
                            selected={this.props.date}
                        />
                    </div>
                
                </Paper>
            </React.Fragment>
        );
    }

}


export default withStyles(styles)( DatePicker );
