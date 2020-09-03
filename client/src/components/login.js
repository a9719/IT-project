import React, { Component } from 'react';
import axios from 'axios';
import { Button, Image, Col, Row} from 'react-bootstrap';
import icon from './loginImage.svg';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post('/login', user)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="login">
        <div className="container-fluid p-10">
          <div className = "row">
            <h1 className="display-4 mx-auto mt-5">Welcome Back</h1>
          </div>
          <div className="row mt-5 align-self-center">
          <div className="col align-self-center pr-1">
              <div className="col-md-12 m-auto">
                <Image src={icon} fluid />
              </div>
            </div>
            <div className="col align-self-center pl-1">
              <div className="col-md-12 m-auto">
                <p className="lead text-center">
                  Login with
                </p>

                  <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
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

                  {/*<Form>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

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

                  </Form>*/}

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;