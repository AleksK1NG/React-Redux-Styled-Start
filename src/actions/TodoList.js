import * as actionsTypes from './actionTypes';
import axios from 'axios';

export const addTodo = (payload) => {
  console.log('addTodo', payload);
  return {
    type: actionsTypes.ADD_TODO,
    payload,
  };
};

export const completeTodo = (payload) => {
  return {
    type: actionsTypes.COMPLETE_TODO,
    payload,
  };
};

export const deleteTodo = (payload) => {
  return {
    type: actionsTypes.DELETE_TODO,
    payload,
  };
};

export const deleteCompleted = () => {
  console.log('DELETE COMPLETED TODOS');
  return {
    type: actionsTypes.DELETE_COMPLETED,
  };
};

export const setData = (payload) => {
  return {
    type: actionsTypes.SET_DATA,
    payload,
  };
};

export const getRequest = () => {
  return dispatch => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        dispatch(setData(response.data));
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
};