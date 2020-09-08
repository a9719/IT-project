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

import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

const Styles = styled.div
`
  .navbar { background-color: #365; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #000000;
    &:hover { color: #365; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #000000;
    &:hover { color: #365; }
  }
  .dropdown-center {
    position: absolute !important;
    left: 50%;
    right: 50%;
  }
  .color-nav {
      background-color : rgb(255,255,255);
  }
`;


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
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
        <div className="navbar">
        <Styles>  
    <Navbar className = "color-nav" expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/">
        <img
          src={logo}
          width="80"
          height="80"
          className="d-inline-block align-top"
          alt=""
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="" onClick={this.onLogoutClick}>Logout</Nav.Link></Nav.Item> 
          <Dropdown class = "dropdown-center">
                <Dropdown.Toggle variant = "outline-info" id = "dropdown-basic">
                    Language Options
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">English</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Chinese</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Japanese</Dropdown.Item>
                </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
        </div>
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
    <h1 className="text-center">WELCOME {this.state.email} </h1>
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