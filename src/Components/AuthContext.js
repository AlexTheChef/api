import React, { Component, createContext } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export class AuthProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: []
        }
    }



    async componentDidMount() {
        let result = await axios.get('https://jsonplaceholder.typicode.com/todos')
        await new Promise(x => setTimeout(x, 1000))
        this.setState({ todos: result.data })
    }

    deleteTodo = (id) => {
        this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) })
    }

    addTodo = async (result) => {
        this.setState({
            todos: [...this.state.todos, result]
        })
    }

    render() {
        return (
            <AuthContext.Provider value={{
                todos: this.state.todos,
                deleteTodo: this.deleteTodo,
                addTodo: this.addTodo,
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContext