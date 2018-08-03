import * as actionTypes from './ActionTypes';

const initialState = {
    tasks : [],
    fetching: false,
    updating: false,
    adding: false,
    removing: false,
    error: false,
};

const fetchTasksStart = (state, action) => {
    return {
        ...state,
        fetching: true
    }
}

const fetchTasksSuccess = (state, action) => {
    return {
        ...state,
        tasks: action.tasks,
        fetching: false,  
    };
}

const fetchTasksFailed = (state, action) => {
    return {
        ...state,
        fetching: false,
        error: action.error,  
    };
}

const addTaskStart = (state, action) => {
    return {
        ...state,
        adding: true,
    };
}

const addTaskSuccess = (state, action) => {
    return {
        ...state,
        adding: false,
    };
}

const addTaskFailed = (state,action) => {
    return {
        ...state,
        adding: false,
        error: action.error,  
    };
}

const updateTaskStart = (state, action) => {
    return {
        ...state,
        updating: true,
    };

}

const updateTaskSuccess = (state, action) => {
    return {
        ...state,
        updating: false,
    };

}

const updateTaskFailed = (state, action) => {
    return {
        ...state,
        updating: false,
        error: action.error,
    };


}

const removeTaskStart = (state, action) => {
    return {
        ...state,
        removing: true,
        taskId: action.taskId,
    };
}

const removeTaskSuccess = (state, action) => {
    return {
        ...state,
        removing: false,
    };

}

const removeTaskFailed = (state, action) => {
    return {
        ...state,
        removing: false,
        error: action.error,
    };
}

const reducer = ( state = initialState, action ) => {
    
    switch ( action.type ) {

        case actionTypes.FETCH_TASKS_START: return fetchTasksStart( state, action );
        case actionTypes.FETCH_TASKS_SUCCESS: return fetchTasksSuccess( state, action );
        case actionTypes.FETCH_TASKS_FAILED: return fetchTasksFailed( state, action );

        case actionTypes.ADD_TASK_START: return addTaskStart( state, action );
        case actionTypes.ADD_TASK_FAILED: return addTaskFailed( state, action );
        case actionTypes.ADD_TASK_SUCCESS: return addTaskSuccess( state, action );

        case actionTypes.UPDATE_TASK_START: return updateTaskStart( state, action );
        case actionTypes.UPDATE_TASK_SUCCESS: return updateTaskSuccess( state, action );
        case actionTypes.UPDATE_TASK_FAILED: return updateTaskFailed( state, action );

        case actionTypes.REMOVE_TASK_START: return removeTaskStart( state, action );
        case actionTypes.REMOVE_TASK_SUCCESS: return removeTaskSuccess( state, action );
        case actionTypes.REMOVE_TASK_FAILED: return removeTaskFailed( state, action );

        default: return state;

    }

};

export default reducer;