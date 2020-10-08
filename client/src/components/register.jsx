import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

import { Button, Image, Row} from 'react-bootstrap';
import icon from './registerImage.svg';
import NavigationBar from "./NavigationBar"
import Footer from "./Footer"

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image:null,
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      image: this.state.image,
      password: this.state.password,
      password2: this.state.password2
    };

    axios
      .post('/register', newUser)
      .then(res => {this.props.history.push("/login");})
      .catch(err => this.setState({ errors: err.response.data }));
    
    this.props.history.push("/login");
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <NavigationBar></NavigationBar>
        <div className="container-fluid bg-light mt-5 pb-5 pt-5 rounded">
          <div className = "row">
            <h1 className="display-4 mx-auto mt-3">Create Account</h1>
            </div>
          <div className="row align-self-center nr-1">
            <div className="col align-self-center d-none d-lg-block">
              <div className="col-md-10 m-auto">
                <Image src={icon} fluid />
              </div>
            </div>
            <div className="col align-self-center nl-1">
              <div className="col-md-12 m-auto">
                <p className="lead text-center">
                  Sign up with
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                      })}
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                      })}
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}

                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                      })}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password2
                      })}
                      placeholder="Confirm Password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                    />
                    {errors.password2 && (
                      <div className="invalid-feedback">{errors.password2}</div>
                    )}
                  </div>
                  <Button variant="info" type="submit" size="lg" block>
                    Submit
                    </Button>
                    
                    <Row>
                      <a href="/login" className="small mx-auto mt-2">
                        Already have an account?
                      </a>
                    </Row>
                  
                </form>
              </div>
            </div>
          </div>
          
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Register;