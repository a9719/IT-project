import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


import { NavigationBar } from './components/NavigationBar';

import Register from './components/register';
import Login from './components/login.js';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          
          <Route exact path="/" component={NavigationBar} />
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