import React, { Component } from 'react'
import axios from 'axios'

class Landing extends Component {

  state = {
    users: []
  }

  getUserDetails = () => {
    axios.get('/users')
      .then((response) => {
        const data = response.data;
        this.setState({users : data});
        console.log("Data has been received!");
      })
      .catch(() => {
        alert("error retreiving data!");
      });
  }


  componentDidMount = () => {
    this.getUserDetails();
  }

  displayUsers = (users) => {
    if(!users.length) return null;
    
    users = users.slice(0,3);
    return users.map((users, index) => (
      <div key = {index}>
        <h3>{users.name}</h3>
        <p>{users.email}</p>
      </div>
    ))
  };

  render() {
    return (
      // <p>Welcome to Swat Kats!</p>
      <div className = "users">
        <p>Welcome to Swat Kats!</p>
        {this.displayUsers(this.state.users)}
      </div>
    )
  }
}

export default Landing