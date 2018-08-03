import React from 'react';
import { withStyles } from '../../../../node_modules/@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';
import { connect } from 'react-redux';
import * as actions from '../../../store/Task/Actions';
import DateTime from '../DateTime/DateTime';

const styles = theme => ({
    Divider:{
        width: '100%',
        marginTop : theme.spacing.unit * 2,
        marginBottom : theme.spacing.unit,
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
    TextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
});

class UpdateTask extends React.Component{
    constructor(props) {
        super(props);  

        this.state = {
            touched: false,
            title: 'Example',
            ...props
        };
      }

    handleChange = (event, name) => {
        const value = (typeof event === 'string') ? event : event.target.value;
        const updateTask = {
            ...this.state.task,
            [name] : value,
        };
        const updateState = {
            ...this.state,
            task: updateTask,
            touched: true,
        };

        this.setState( updateState );
    }
    handleButton = () => {
        
        if(!this.state.touched) return null;   
        const task = this.state.task;
        const update = {
            title: task.title,
            dueDate: task.dueDate,
        };
        this.props.updateTask(task.id, update);
    }
    render(){

        if(!this.state.task) return null;
        const { classes } = this.props;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: this.state.success,
          });

        return (

            <form className={classes.container} noValidate autoComplete="off">
                                
                <TextField
                    id="selected-task-title"
                    label="title"
                    className={classes.TextField}
                    value={this.state.task.title}
                    onChange={(event) => this.handleChange(event,'title')}
                    margin="normal"
                />

                 <DateTime 
                        value={this.state.task.dueDate} 
                        onChange={(timestamp) => this.handleChange(timestamp,'dueDate')}
                    />

                <Divider className={classes.Divider}/>

                <div className={classes.wrapper}>

                    <Button
                        variant="contained"
                        color="primary"
                        className={buttonClassname}
                        disabled={this.props.loading}
                        onClick={event => this.handleButton(event)}
                    >
                        Edit
                    </Button>

                    {this.props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}

                </div>
                
            </form> 

        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.task.updating
    };
};
const mapDispatchToProps = dispatch => {
    return {
        updateTask: (id, updateObj) => dispatch( actions.updateTask(id, updateObj) ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(withStyles(styles)(UpdateTask));