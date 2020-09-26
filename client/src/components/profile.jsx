import React, { Component } from 'react'
import {Helmet} from "react-helmet";
import axios from 'axios';
import {connect} from 'react-redux';
import { Nav, Navbar, Dropdown} from 'react-bootstrap';
import styled from 'styled-components';
import logo from './logo.svg';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setCurrentUser, logoutUser } from "./../actions/authActions";
import JwtDecode from 'jwt-decode';
import setAuthToken from "../utils/setAuthToken"
import { GET_PROFILE } from "../actions/profileActions";
import NavigationBar from "./components/NavigationBar"
import Footer from "./Footer";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      bio: ''
    };
  this.onLogoutClick=this.onLogoutClick.bind(this);}

    onLogoutClick = (e) => {
      e.preventDefault();
      this.props.logoutUser();
      this.props.history.push('/login');
  };
  componentDidMount() {
    axios
        .get('/profile1/'+(this.props.auth.user))
        .then(res=>{this.setState({email:res.data[0].email, bio:res.data[0].name});
          console.log(this.state);
          console.log("2");})
    
}



  
  render() {
    
    //if ((this.state.email.length)===0)
    //{ console.log("1");
      //this.componentDidMount();
      //return null;
    //}
    
    
    return (
      <div className = "page-container">
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
Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
  });
export default connect(mapStateToProps, {logoutUser})(Profile);