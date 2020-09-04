
  
import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import {Helmet} from 'react-helmet';
import PropTypes from "prop-types";
import {connect} from 'react-redux';


class App extends Component {

  render() {

      
      return(
          <div>
          <h1 className="text-center">WELCOME </h1>
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