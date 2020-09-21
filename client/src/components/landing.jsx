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
<<<<<<< Updated upstream
      <div key = {index}>
        <h3>{users.name}</h3>
        <p>{users.email}</p>
=======
      <div class="row">
        <div class="col-md-4"></div>
        <div class = "card-group " key = {index} >
          <TestCard name  = {users.name} bio = {users.bio}/>
        </div>
>>>>>>> Stashed changes
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