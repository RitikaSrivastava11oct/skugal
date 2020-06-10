import * as ActionTypes from './ActionTypes';
import firestore from '@react-native-firebase/firestore';

export const fetchQuizzes = ()=>async(dispatch) => {
    dispatch (quizzesLoading());
    const quizzes=[];
    const querySnapshot=await firestore().collection('quizzes').get();
        await querySnapshot.forEach(documentSnapshot => {
            quizzes.push(documentSnapshot.data());
    });
    await dispatch (addQuizzes(quizzes));

};

export const addQuizzes = (quizzes) => ({
    type: ActionTypes.ADD_QUIZZES,
    payload: quizzes
});

export const quizzesLoading = () => ({
    type: ActionTypes.QUIZZES_LOADING
});

export const quizzesFailed = (errmess) => ({
    type: ActionTypes.QUIZZES_FAILED,
    payload: errmess
});
export const updateQuiz = (itemId) =>({
    type: ActionTypes.UPDATE_QUIZ,
    payload: itemId
});


