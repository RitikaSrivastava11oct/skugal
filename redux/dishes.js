import * as ActionTypes from './ActionTypes';

export const dishes = (state = { isLoading : true,
                                 errMess : null ,
                                 dishes : []}, action) => {
        switch (action.type){
            case ActionTypes.ADD_DISHES:
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
                    
                action.payload.sort(GetSortOrder("count")); 
                var top5=[];
                for(var i=0;i<5;i++){
                    top5.push(action.payload[i]);
                }   
                // document.write("Sorted Employee Names : ");    
                // for (var item in array) {    
                //     document.write("<br>" + array[item].EmployeeName);    
                // }  
                return {...state , isLoading : false , errMess: null , dishes: action.payload}

            case ActionTypes.DISHES_LOADING:
                return {...state, isLoading: true, errMess: null, dishes: []}
    
            case ActionTypes.DISHES_FAILED:
                return {...state, isLoading: false, errMess: action.payload};

            case ActionTypes.ADD_DISH:
                const len=state.dishes.length;
                action.payload.id=len;
                return {...state, isLoading: false, errMess: null, dishes: state.dishes.concat(action.payload)};
    
            default:
                return state;
        }                         
    
};