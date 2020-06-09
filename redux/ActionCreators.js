import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import moment from "moment";

export const fetchDishes = ()=>(dispatch) => {
    dispatch (dishesLoading());

    return fetch(baseUrl + 'dishes')
    .then( response => {
        if( response.ok){
            
            return response;   
        }
        else{
            var error =new Error('Error '+ response.status + ':' + response.statusText);
            error.response=response;
            throw error;
        }
    },error => {
        var errmess = new Error (error.message);
        throw errmess;
    }
    )
    .then( response => response.json())
    .then( dishes => dispatch (addDishes(dishes)))
    .catch(error => dispatch (dishesFailed(error.message)))

};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const postDish = (name,category,label,price,description) =>(dispatch) => {
    const data = {
        "name" : name,
        "image": "images/uthappizza.png",
        "category" : category,
        "label" : label,
        "price" : price,
        "featured" : "false",
        "description" : description
    }
    // console.log('data ====='+ JSON.stringify(data));
    const ob = baseUrl + 'dishes';
    const ob1={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
          
    };
    console.log('ob***** '+ ob);
    console.log('ob1***** '+ ob1);
    console.log('ob1***** '+ JSON.stringify(ob1));
    return fetch(ob, ob1)
    .then(response => {
        console.log('new dish added *********** '+response);
         return response.json()
    })
    .then( dish => {
        console.log(" 111111111111 "+ dish);
        dispatch (addDish(dish))})
    .catch(error => dispatch (dishesFailed(error.message)))

};

