import React from 'react';
import { connect } from 'react-redux';
import Table from '../../components/UI/Table/Table';
import UpdateTask from '../../components/UI/Task/UpdateTask';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NewTask from '../../components/UI/Task/NewTask';
import * as actions from '../../store/Task/Actions';

const styles = theme => ({
    drawerAppBar: {
        boxShadow: 'none',
    },
    drawerAppBarPaper: {
        padding: theme.spacing.unit * 2,
        boxShadow: theme.shadows[0],
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

    menu: {
      width: 200,
    },
});

class Tasks extends React.Component {

    state = {
        success: false,
        loading: false,
        drawer: false,
        selectedTask : {},
    }

    componentDidMount(){
        this.props.fetchTasks();
    }


    toggleDrawer = (side, open) => {
        this.setState({
          drawer: open,
        });
    };
    
    handleClickTableCell = (event, id) => {
        const tasks = this.props.tasks;
        const task = tasks.find(t => {
            return t.id === id;
        });
        task.touched = false;

        this.setState({task: task});
        this.toggleDrawer('bottom',true);
    }

    removeHandler = (event,id) => {
        event.preventDefault();
        this.props.removeTask( id );
        return false;
    }

    render(){

        if(this.props.tasks == null)
            return 'loading';

        const { classes } = this.props;
      
        return (
            <React.Fragment> 
                
                <NewTask disabled={this.state.loading} loading={this.state.loading} />
                
                <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
                <Table 
                    data={this.props.tasks} 
                    handleClickTableCell={this.handleClickTableCell} 
                    removeHandler={this.removeHandler}/>
                
                <Drawer anchor="right" open={this.state.drawer} onClose={() => this.toggleDrawer('bottom', false)}>
                    
                    <div tabIndex={0} role="button">

                        <AppBar className={classes.drawerAppBar} position="static" color="default">
                            <Toolbar>
                            <Typography variant="title" color="inherit">
                                edit task
                            </Typography>
                            </Toolbar>
                        </AppBar>

                        <Paper className={classes.drawerAppBarPaper}>
                       
                            <UpdateTask task={this.state.task} />

                        </Paper>

                    </div>

                </Drawer>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.task.tasks,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTasks: () => dispatch( actions.fetchTasks() ),
        removeTask: (id) => dispatch( actions.removeTask(id) ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(withStyles(styles)(Tasks));