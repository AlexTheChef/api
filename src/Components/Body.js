import React, { Component } from 'react'
import AuthContext from './AuthContext'
import axios from 'axios'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


class Body extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            title: '',
            toggle: false,
            search: ''
        }
    }
   

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })   
    }
    
    deleteItem = (todoId) => {
        axios.delete("https://jsonplaceholder.typicode.com/todos/" + todoId).then(
            response => {
                if (response.data != null) {
                    console.log('Izbrisano')
                    console.log(todoId)
                    this.context.deleteTodo(todoId)
                }
            }
        )
    }

    AddItem = (e) => {
        e.preventDefault()
        axios.post("https://jsonplaceholder.typicode.com/todos/", {
            title: this.state.title,
            completed: this.state.toggle
        }).then(
            response => {
                if (response.data != null) {
                    console.log('Dodato')
                    console.log(response.data)
                    this.context.addTodo(response.data)
                    this.setState({ title: '' })
                }
            }
        )
    }


   

    render() {
        return (
            <div className="list-padding">
                <div className="list-group">
                    <div className='width'><input className='search' onChange={this.handleChange} name='search' type='text' placeholder='Search Todos'/></div>
                    <br></br>
                    <form >
                        <label className='label'>New Todo:&nbsp; </label>
                        <input className='search2' name='title' onChange={this.handleChange} value={this.state.title}></input>&nbsp;&nbsp;
                        <button className='button2' onClick={this.AddItem.bind(this)}>Add</button>
                    </form>
                    <br></br>
                </div>
                <ul className="list-group">
                    {this.context.todos.filter( val => {
        if(this.state.search === "") {
            return val
        } else {
           if(val.title.toLowerCase().includes(this.state.search.toLowerCase())){
                return val
            }
        }
    }
    ).reverse().map(todo =>
                        <li key={todo.id} className="list-container">
                            <span>
                                <input type='checkbox' checked={todo.completed} ></input>&nbsp;&nbsp;
                            </span>
                            <div className='list'>{todo.title}&nbsp;</div>
                            <span>
                            <DeleteForeverIcon className='button' fontSize='large' color='error' onClick={this.deleteItem.bind(this, todo.id)}/>
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

Body.contextType = AuthContext

export default Body
