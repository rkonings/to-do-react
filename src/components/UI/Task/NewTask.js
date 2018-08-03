import React from 'react';
import { connect } from 'react-redux';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import * as actions from '../../../store/Task/Actions';
import DateTime from '../DateTime/DateTime';
import Moment from 'moment';

const styles = theme => ({
    paper:{
        marginBottom: theme.spacing.unit * 2,
    },
    wrapper: {
        margin: '18px 10px',
        position: 'relative',
      },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
      },
      fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
      },
      buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -22,
        marginLeft: -12,
      },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    
});

class NewTask extends React.Component{

    constructor(props) {
        super(props);      
        this.state = {
            focused: false,
            touched: false,
            title: 'Placeholder',
            dueDate: Moment().format('X'),
            ...props,
        };
    }

    handleChange = (event, name) => {

        const value = (typeof event === 'string') ? event : event.target.value;

        this.setState({
            ...this.state,
            [name]: value,
            touched : true,
        });

    };

    clickHandler = (event) => {
        const task = {
            title : this.state.title,
            dueDate: this.state.dueDate,
            createdAt : Moment().format('X'),
        };
        this.props.addTask(task);

    }

    render(props){
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                    id="title"
                    label="title"
                    className={classes.textField}
                    value={this.state.title}
                    onChange={(event) => this.handleChange(event,'title')}
                    margin="normal"
                    />

                    <DateTime 
                        value={this.state.dueDate} 
                        onChange={(date) => this.handleChange(date, 'dueDate')}
                    />

                    <div className={classes.wrapper}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.buttonSuccess}
                            disabled={this.props.loading}
                            onClick={(event) => this.clickHandler(event)}
                        >
                            Toevoegen
                        </Button>
                        {this.props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                    
                </form>
            </Paper>
        );
    }

}

const mapStateToProps = state => {
    return {
        loading: state.task.adding
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addTask: (task) => dispatch( actions.addTask(task) ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(withStyles(styles)(NewTask));