import * as actionTypes from '../actions/actionTypes';
import uuid from 'uuid';

const initialState = {
  todoList: [],
  error: null,
  isFetched: false,
  dataList: [],
};

const todoList = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, {text: action.payload, completed: false, id: uuid()}]
      };
    case actionTypes.COMPLETE_TODO:
      return {
        ...state,
        todoList: state.todoList.map(todo => todo.id === action.payload ? {
            ...todo,
            completed: !todo.completed
          }
          : todo)
      };
    case actionTypes.DELETE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id !== action.payload)
      };
    case actionTypes.DELETE_COMPLETED:
      return {
        ...state,
        todoList: state.todoList.filter(todo => !todo.completed)
      };
    case actionTypes.SET_DATA:
      return {
        ...state,
        dataList: [...state.dataList, ...action.payload],
      };
    default:
      return state;
  }
};

export default todoList;