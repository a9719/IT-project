import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "./App.css"
import NavigationBar from "./components/NavigationBar"
import Footer from "./components/Footer"

import Register from './components/register';
import Login from './components/login';
import Landing from './components/landing';

class App extends Component {
  render() {
    return (
        <div className = "page-container">
          <NavigationBar/>

          <div className = "content-wrap">
            <Router>
              <div className="App">
                <Route exact path="/" component={Landing} />
                <div className="container">
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </div>
              </div>
            </Router>
          </div>
          
          <Footer/>
        </div>
    )
  }
}


export default App