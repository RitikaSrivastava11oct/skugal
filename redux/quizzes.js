import * as ActionTypes from './ActionTypes';

export const quizzes = (state = { isLoading : true,
                                 errMess : null ,
                                 quizzes : []}, action) => {
        switch (action.type){
            case ActionTypes.ADD_QUIZZES:
                 return {...state , isLoading : false , errMess: null , quizzes: action.payload}

            case ActionTypes.QUIZZES_LOADING:
                return {...state, isLoading: true, errMess: null, quizzes: []}
    
            case ActionTypes.QUIZZES_FAILED:
                return {...state, isLoading: false, errMess: action.payload};

            case ActionTypes.UPDATE_QUIZ:
                return {...state, quizzes: state.quizzes.map((quiz)=>quiz.id === action.payload ? {...quiz,count:quiz.count+1}:quiz)}
    
            default:
                return state;
        }                         
    
};