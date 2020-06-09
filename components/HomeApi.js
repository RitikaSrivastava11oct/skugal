import firestore from '@react-native-firebase/firestore';

function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
} 

async function fetchData(){
    try {
        const quizzes=[];
        const querySnapshot=await firestore().collection('quizzes').get();
            await querySnapshot.forEach(documentSnapshot => {
                quizzes.push(documentSnapshot.data());
        });
        
        console.log('quizzes',quizzes);

        //sort max 5
   
            
        quizzes.sort(GetSortOrder("count")); 
        var top5=[];
        for(var i=0;i<5;i++){
            top5.push(quizzes[i]);
        }   
        console.log('top 5 quizzes',top5);
        // document.write("Sorted Employee Names : ");    
        // for (var item in array) {    
        //     document.write("<br>" + array[item].EmployeeName);    
        // }  
        const response={ "result": true , data : top5 , allQuizzes : quizzes};
        return response;


        // quizzes.forEach((doc) => {
        //     Object.assign(doc ,{count : 0});
        //      firestore().collection('quizzes').add(doc);
        //    });
        // console.log('quizzes', quizzes);
        // return "data";
    } 
    catch (error) {
        throw error;
    }
}

export const HomeApi ={ fetchData };