import firestore from '@react-native-firebase/firestore';

async function fetchData(){
    try {
        //   array.forEach((doc) => {
        //     firestore().collection('quizzes').add(doc);
        //   });
        // // const data1= await firestore().collection('users').add();
        // const users = await firestore().collection('quizzes').get();
        // console.log('quizzes ',users);
        const quizzes = await firestore().collection('quizzes').get();
        console.log('quizzes ',quizzes);
        const response={ "result": true , data : quizzes};
        return quizzes;
    } 
    catch (error) {
        console.log('error while fetching data', error);
        const response={ "result": false , data : error};
        throw error;
    }
}

export const HomeApi ={ fetchData};