import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import DatePicker from './DatePicker';
import Moment from 'moment';


const styles = theme =>{ 
    return ({

    wrapper: {
        position: 'relative',
      },

    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        zIndex: 2,
    },
    Backdrop: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        position: 'fixed',
    }, 
    
});
}

class DateTime extends React.Component{

    constructor(props) {
        super(props); 
        this.state = {
            date: Moment.unix(props.value).toObject(),
            value: props.value,
            ...props,
        };
    }

    onClickHandler = () => {
        if(!this.state.show) this.toggleDatePicker();
    }
    
    onChangeHandler = (e) => {
        const value = e.target.value;
        const updateState = {
            ...this.state,
            value: value,
            invalid: true,
        };
        const m = Moment(value, ["DD-MM-YYYY"]);
        if(m.isValid()){
            updateState.date = m.toObject();
            updateState.invalid = false;
            this.props.onChange(m.format('X'));
        }
        
        this.setState(updateState); 
    }

    toggleDatePicker = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                show: !prevState.show
            }
    
        })
    }

    datePickerChangeHandler = (dateObj) => { 
        this.setState({
            ...this.state,
            date: dateObj,
            invalid: false,
            value: Moment(dateObj).format('X'),
        });
        this.toggleDatePicker();
        this.props.onChange(Moment(dateObj).format('X'));
    }

    render(){
        const { classes } = this.props;
        const datepicker = this.state.show ? 
            <DatePicker
                invalid={this.state.invalid}
                date={this.state.date}
                onChange={this.datePickerChangeHandler}
            /> : null;

        const backdrop = this.state.show ?
            <div onClick={() => this.toggleDatePicker()} className={classes.Backdrop}></div> : null;

        return (
            <div className={classes.wrapper}>
                {backdrop}
                <TextField
                    id="title"
                    label="Due date"
                    className={classes.textField}
                    value={Moment.unix(this.state.value).format('D-M-Y')}
                    margin="normal"
                    onChange={(e) => this.onChangeHandler(e)}
                    onClick={() => this.onClickHandler()}
                />
                {datepicker}
            </div>
        );
    }
}

export default withStyles(styles)(DateTime);