import React, { Component } from 'react'
import {Helmet} from "react-helmet";
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import JwtDecode from 'jwt-decode';
import setAuthToken from "../utils/setAuthToken"
import { GET_PROFILE } from "../actions/profileActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };}

  componentDidMount() {
    axios
        .get('/profile1/'+(this.props.auth.user))
        .then(res=>{this.setState({email:res.data[0].email});
          console.log(this.state);
          console.log("2");})
    
}


  
  render() {
    
    if ((this.state.email.length)===0)
    { console.log("1");
      this.componentDidMount();
      return null;
    }
    
    
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
    <h1 className="text-center">WELCOME {this.state.email} </h1>
          </div>
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
  });
export default connect(mapStateToProps, null)(Profile);