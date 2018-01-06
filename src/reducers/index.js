import { combineReducers } from 'redux';
import register from './register';
import todoList from './TodoList';

export default combineReducers({
  register,
  todoList,
});
