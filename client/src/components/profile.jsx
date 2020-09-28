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
import "./profile_pic.css";

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
  .nav.nav-center {
    display: inline-block;
    left: 0;
    right: 0;
    margin:0;
    float:none;
  }
`;
function DisplayList(props) {
  const items = props;
  const listItems = items.map( (item, index) =>
    <li key = {index} >{item}</li>
  );
  return (
    <ul>{listItems}</ul> 
  );
}



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      bio: '',
      skills: [],
      subjects: [],
      education: [],
      website: '',
      phone: '',
      selectedFile: null,
      profilePicture: ''
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
        .then(res=>{
          this.setState({email:res.data[0].email,
                         name:res.data[0].name,
                         bio:res.data[0].bio,
                         skills:res.data[0].skills,
                         subjects:res.data[0].subjects,
                         education:res.data[0].education,
                         website:res.data[0].website,
                         phone:res.data[0].phone,
                         profilePicture: res.data[0].profile_picture,
                         imgHash: Date.now()
                        });
          console.log(this.state);
          console.log("2");})
    
}

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }



  fileUploadHandler = () => {
    const fd = new FormData();
    if (this.state.selectedFile == null) {
      return (Error);
    }
    fd.append('image', this.state.selectedFile);
      try {
        axios.post('/img-upload', fd).then((postResponse) => {
        this.newPP = postResponse.data.imageUrl;
        console.log(postResponse);
      }, (err) => {
        console.log(err);
      }).then(() => {
        //do PUT call
        const data = {
          profilePic: this.newPP
        }
        console.log(data);
        axios.put('/addprofilepic/' + this.props.auth.user, data).then((putResponse) => {
          //do PUT stuff with response
          this.setState({
            profilePicture: this.newPP
          });
          console.log(putResponse);
        })
      })
    }catch(err) {
      console.log(err);
    };
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
            <h1 className="text-center">WELCOME {this.state.name} </h1>
            <img key = {this.state.imgHash} src = {this.state.profilePicture} class = "profile_pic" alt = "profilePic"/>
            <input type = "file" accept=".jpg, .png" onChange={this.fileSelectedHandler}/>
            <button onClick={this.fileUploadHandler}>Upload</button>
          </div>
          <div class = "mx-auto">
            <Navbar bg="light" variant="light">
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-center">
                <Nav fill>
                  <Nav.Link href = "#personal"> Personal </Nav.Link>
                  <Nav.Link href = "#skills"> Skills </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>

        <div  id = "personal" className="jumbotron mt-5 bg-info text-white">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center"> Personal Details </h1>
          </div>
        </div>
        <div>
            <p style= {{ fontSize: '25px'}} > {this.state.bio} </p>
        </div>

        <div id = "skills" className="jumbotron mt-5 bg-info text-white">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center"> Skills </h1>
          </div>
        </div>
        <div>
            <p style= {{ fontSize: '25px'}} > {DisplayList(this.state.skills)} </p>
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