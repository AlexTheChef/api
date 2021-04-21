import React, { Component } from 'react'
import './App.css'
import Loading from './Components/Loading'
import Body from './Components/Body'
import AuthContext from './Components/AuthContext'

class App extends Component {

  render() {
    return (
      <div className='container'>
        {this.context.todos.length > 0 ? <Body /> : <Loading />}
      </div>
    )
  }
}

App.contextType = AuthContext

export default App
