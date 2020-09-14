import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import {Helmet} from 'react-helmet';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "./App.css"
import NavigationBar from "./components/NavigationBar"
import Footer from "./components/Footer"

import Register from './components/register';
import Login from './components/login';
import Landing from './components/landing';
import Card from 'react-bootstrap/Card';

class App extends Component {

  render() {
    return (
        <div className = "page-container">
          <NavigationBar/>
          <Card name = "Jon Snow" link = "/register"/>

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



App.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);