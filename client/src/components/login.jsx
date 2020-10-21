import React, { Component } from 'react';

import { Button, Image, Col, Row} from 'react-bootstrap';
import icon from './loginImage.svg';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, setUserLoading, setUserNotLoading } from "../actions/authActions";


import classnames from "classnames";
import { Nav, Navbar, Dropdown} from 'react-bootstrap';
import styled from 'styled-components';
import logo from './logo.svg';
import NavigationBar from "./NavigationBar";
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import Footer from "./Footer"
import en from "./i18n/en";
import cn from "./i18n/cn";
import jp from "./i18n/jp";
import "./Footer.css";

//Translation
counterpart.registerTranslations('en',en);
counterpart.registerTranslations('cn',cn);
counterpart.registerTranslations('jp',jp);
counterpart.setLocale('en');


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


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange =this.onChange.bind(this);
  }
  switchtoen = () => {
  
    counterpart.setLocale('en')
 
  };
  switchtocn = () => {
    
    counterpart.setLocale('cn');

  };
  switchtojp= () => {
    
    counterpart.setLocale('jp')

  };

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
        
        this.props.history.push("/profile");
    }
}
componentDidUpdate(prevProps) {
  if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
      this.props.setUserNotLoading();
  }

  if (this.props.errors !== prevProps.errors) {
      this.props.setUserNotLoading();
      this.setState({
          errors: this.props.errors
      });
  }
}

onChange = (e) => {
  this.setState({[e.target.name]: e.target.value});
}

onSubmit = (e) => {
  e.preventDefault();

  const userData = {
      email: this.state.email,
      password: this.state.password
  };
  
  // Redirect is handled by the redux action loginUser so we don't need to use this.props.history
  this.props.loginUser(userData);
  this.props.setUserLoading();
};
  render() {
    const { errors } = this.state;
    return (
      
      <div className="login">
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
          <Nav.Item style={{paddingRight:"4px"}}><Nav.Link href="/register" style={{borderStyle:"solid", borderRadius:"8px", borderWidth:"thin", color:"#17a2b8"}}><Translate content='register'></Translate></Nav.Link></Nav.Item>
 
          <Nav.Item style={{paddingRight:"4px"}}><Nav.Link href="/login" style={{borderStyle:"solid", borderRadius:"8px", borderWidth:"thin", color:"#17a2b8"}}><Translate content='login'></Translate></Nav.Link></Nav.Item>
          <Nav.Item>
          <Dropdown style={{size:"50px"}}>
                <Dropdown.Toggle variant = "outline-info" id = "dropdown-basic"  style={{borderStyle:"solid", borderRadius:"8px", borderWidth:"thin", }}>
                    Language Options
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="" onClick={this.switchtoen}>English</Dropdown.Item>
                    <Dropdown.Item href="" onClick={this.switchtocn}>Chinese</Dropdown.Item>
                    <Dropdown.Item href="" onClick={this.switchtojp}>Japanese</Dropdown.Item>
                </Dropdown.Menu>
          </Dropdown>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
        <div className="container-fluid bg-light mt-5 pb-5 pt-5 rounded">
        
          <div className = "row">
            
            <h1 className="display-4 mx-auto"><Translate content='welcome'></Translate> </h1>
          </div>
          <div className="row mt-5 align-self-center">
          <div className="col align-self-center d-none d-lg-block">
              <div className="col-md-8 m-auto">
                <Image src={icon} fluid />
              </div>
            </div>
            <div className="col align-self-center">
              <div className="col-md-12 m-auto">
                <p className="lead text-center">
                <Translate content='login'></Translate>
                </p>

                  <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      type="email"
                      className={classnames("form-control", {
                        invalid: errors.email || errors.emailnotfound
                    })}
                      placeholder="Email Address"
                      name="email"
                          
                          required autoFocus 
                    />
                  </div>
                  <div className="form-group">
                    <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    type="password"
                    className={classnames("form-control", {
                      invalid: errors.password || errors.passwordincorrect
                  })}
                      placeholder="Password"
                      name="password"
                      required
                      
                      
                    />

                    
                  </div>
                  <Row>
                      <Col>
                        <Button variant="info" type="submit" size="lg" block>
                        <Translate content='login'></Translate>
                        </Button>  
                      </Col>
                      <Col>
                        <Button href="/register" variant="outline-info" type="submit" size="lg" block>
                        <Translate content='register'></Translate>
                        </Button>
                      </Col>
                    </Row>
                  </form>

                  
              </div>
              
            </div>
          </div>
          
        </div>
        <div className = "main-footer">
    <div className = "container">
      <div className = "row">
        <div className = "col">
          <h4>Swat Kats</h4>
          <p>
          <Translate content='info'></Translate>
          </p>
        </div>

        <div className = "col">
          <h4><Translate content='createdby'></Translate></h4>
          <ul className = "list-unstyled">
            <li>Aneesh Chattaraj</li>
            <li>Dylan Stewart</li>
            <li>Ian Teh Jing Wen</li>
            <li>Ragav Narayanan</li>
            <li>Zhi Jie Siow</li>
          </ul>
        </div>
      </div>

      <div className = "row">
        <p className = "col-sm">
          &copy;{new Date().getFullYear()} Swat Kats | All rights reserved
        </p>
      </div>
    </div>
  </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setUserLoading: PropTypes.func.isRequired,
  setUserNotLoading: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
  };
  
  // This maps the state that we get from the Redux store to the props for this component
  const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
  });
  
  export default connect(
  mapStateToProps,
  { loginUser, setUserLoading, setUserNotLoading }
  )(Login);