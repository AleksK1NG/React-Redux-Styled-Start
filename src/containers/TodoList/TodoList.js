import React, { Component } from 'react';
import * as actionCreators from '../../actions/index';
import { connect } from 'react-redux';
import { Button } from '../../styled-components/button';

class TodoList extends Component {

  state = {
    todo: '',
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
    console.log(this.state.todo);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.todo);
    console.log(this.state.todo);
    this.setState({todo: ''});
  };

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={(e) => this.handleChange(e)}
            value={this.state.todo}
            placeholder="Add todo"
            name="todo"
            type="text"/>
          <Button>Add todo</Button>
        </form>
        <br/>
        {this.props.todoList.map(todo => (
          <div key={todo.id}>
            {todo.text}
            <input
              onChange={() => this.props.completeTodo(todo.id)}
              type="checkbox"
              value={todo.completed}/>
            <Button onClick={() => this.props.deleteTodo(todo.id)}>Delete</Button>
          </div>
        ))}
        <br/>
        <hr/>
        <br/>
        <Button onClick={() => this.props.deleteCompleted()}>Delete All Completed Todos</Button>
        <br/>
        <Button onClick={() => this.props.getRequest()} >Fetch json</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList.todoList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (payload) => dispatch(actionCreators.addTodo(payload)),
    completeTodo: (payload) => dispatch(actionCreators.completeTodo(payload)),
    deleteTodo: (payload) => dispatch(actionCreators.deleteTodo(payload)),
    deleteCompleted: () => dispatch(actionCreators.deleteCompleted()),
    getRequest: () => dispatch(actionCreators.getRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);