import axios from 'axios';
import * as actionTypes from './ActionTypes';

export const fetchTasks = () => {
    return dispatch => {

        dispatch(fetchTasksStart());
        
        axios.get( 'https://reactjs-todo-b8ac4.firebaseio.com/tasks.json')
            .then( res => {
                const fetchedTasks = [];
                for ( let key in res.data ) {
                    fetchedTasks.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchTasksSuccess(fetchedTasks));
            } )
            .catch( err => {
                dispatch(fetchTasksFailed(err));
            } );
    };

}

export const fetchTasksSuccess = ( tasks ) => {
    return {
        type: actionTypes.FETCH_TASKS_SUCCESS,
        tasks: tasks,
    };

}

export const fetchTasksFailed = ( error ) => {
    return {
        type: actionTypes.FETCH_TASKS_FAILED,
        error: error,
    };

}

export const fetchTasksStart = () => {
    return {
        type: actionTypes.FETCH_TASKS_START
    };
}

export const addTask = (task) => {
    return dispatch => {

        dispatch(addTaskStart(task));
        
        axios.post( 'https://reactjs-todo-b8ac4.firebaseio.com/tasks.json', task)
            .then( res => {
                const task = res.data;
                dispatch(addTaskSuccess(task));
                dispatch(fetchTasks());
            } )
            .catch( err => {
                dispatch(addTaskFailed(err));
            } );
    };

}

export const addTaskStart = (task) => {
    return {
        type: actionTypes.ADD_TASK_START,
        task: task,
    }
}

export const addTaskSuccess = (task) => {
    return {
        type: actionTypes.ADD_TASK_SUCCESS,
        task: task,
    }
}

export const addTaskFailed = ( error ) => {
    return {
        type: actionTypes.ADD_TASK_FAILED,
        error: error,
    }
}

export const updateTask = (id,updateObj) => {

    return dispatch => {

        dispatch(updateTaskStart(id,updateObj));

        axios.patch( 'https://reactjs-todo-b8ac4.firebaseio.com/tasks/' + id + '.json', updateObj )
            .then( response => {
                const task = response.data;
                dispatch(updateTaskSuccess(task));
                dispatch(fetchTasks());
            } )
            .catch( error => {
                dispatch( updateTaskFailed( error ) );
           
            } );
    };

}

export const updateTaskStart = (id, updateObj) => {
    return {
        type: actionTypes.UPDATE_TASK_START,
        id: id,
        updateObj: updateObj,
    }
}

export const updateTaskSuccess = (task) => {
    return {
        type: actionTypes.UPDATE_TASK_SUCCESS,
        task: task,
    }

}

export const updateTaskFailed = (error) => {
    return {
        type: actionTypes.UPDATE_TASK_FAILED,
        error: error,
    }
}

export const removeTask = (id) => {

    return dispatch => {

        dispatch(removeTaskStart(id));

        axios.delete( 'https://reactjs-todo-b8ac4.firebaseio.com/tasks/' + id + '.json' )
            .then( response => {
                dispatch(removeTaskSuccess());
                dispatch(fetchTasks());
            } )
            .catch( error => {
                dispatch( removeTaskFailed( error ) );
           
            } );
    };

}

export const removeTaskStart = (id) => {
    return {
        type: actionTypes.REMOVE_TASK_START,
        taskId: id,
    }

}

export const removeTaskSuccess = () => {
    return {
        type: actionTypes.REMOVE_TASK_SUCCESS
    }
}

export const removeTaskFailed = ( error ) => {
    return {
        type: actionTypes.REMOVE_TASK_FAILED,
        error: error,
    }

}