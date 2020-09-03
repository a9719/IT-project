import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


import Register from './components/register';
import Login from './components/login.js';
import Landing from './components/landing';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </div>
      </Router>
    )
  }
}


export default App