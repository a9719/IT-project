import React, { Component } from 'react'
import {Helmet} from "react-helmet";
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import JwtDecode from 'jwt-decode';
import setAuthToken from "../utils/setAuthToken"
import { GET_PROFILE } from "../actions/profileActions";

import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      bio: ''
    };}

  componentDidMount() {
    axios
        .get('/profile1/'+(this.props.auth.user))
        .then(res=>{this.setState({email:res.data[0].email, bio:res.data[0].name});
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
        <NavigationBar/>
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
    <h1 className="text-center">WELCOME {this.state.email} </h1>
    <h2 className = "text-center">Welcome {this.state.bio} </h2>
          </div>
          
        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
  });
export default connect(mapStateToProps, null)(Profile);