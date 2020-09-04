import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { Button, Image, Row} from 'react-bootstrap';
import icon from './registerImage.svg';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
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
      password: this.state.password,
      password2: this.state.password2
    };

    axios
      .post('/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container-fluid w-80 mt-5 bg-light rounded pb-5">
          <div className = "row">
            <h1 className="display-4 mx-auto mt-5">Create Account</h1>
            </div>
          <div className="row mt-5 align-self-center">
            <div className="col align-self-center pr-1 d-none d-md-block">
              <div className="col-md-10 m-auto mb-5">
                <Image src={icon} fluid />
              </div>
            </div>
            <div className="col align-self-center pl-1">
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

        {/*<div className="container-fluid p-10">
          <div className = "row">
            <h1 className="display-4 mx-auto mt-5">Create Account</h1>
          </div>
          <div className="row mt-5 align-self-center">
          <div className="col align-self-center pr-1">
              <div className="col-md-12 m-auto">
                <Image src={icon} fluid />
              </div>
            </div>
            <div className="col align-self-center pl-1">
              <div className="col-md-12 m-auto">
                <p className="display-4 text-center">
                  Sign up with
                </p>

                  <Form>

                  <Form.Group controlId="formBasicName">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="name" placeholder="Name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Email Address" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="info" type="submit" size="lg" block>
                          Login
                      </Button>

                  </Form>

              </div>
            </div>
          </div>
        </div>*/}

      </div>
    );
  }
}

export default Register;