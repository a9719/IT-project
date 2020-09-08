import React, { Component } from 'react';
import axios from 'axios';
import { Button, Image, Col, Row} from 'react-bootstrap';
import icon from './loginImage.svg';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, setUserLoading, setUserNotLoading } from "../actions/authActions";
import classnames from "classnames";
import NavigationBar from "./NavigationBar"
import Footer from "./Footer"

import ErrorAlert from "../alerts";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange =this.onChange.bind(this);
  }

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
        <NavigationBar/>
        <div className="container-fluid bg-light mt-5 pb-5 pt-5 rounded">
        
          <div className = "row">
            
            <h1 className="display-4 mx-auto">Welcome Back</h1>
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
                  Login with
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
                          Login
                        </Button>  
                      </Col>
                      <Col>
                        <Button href="/register" variant="outline-info" type="submit" size="lg" block>
                          Sign up
                        </Button>
                      </Col>
                    </Row>
                  </form>

                  
              </div>
              
            </div>
          </div>
          
        </div>
        <Footer/>
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