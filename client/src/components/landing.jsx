import React, { Component } from 'react'
import axios from 'axios'
import TestCard from './TestCard'
import Cardflip from './Cardflip'

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

  cardchoice(props){
    if(props.num % 2 == 0){
      return <TestCard name  = {props.name} bio = {props.bio}/>
    }
    return <Cardflip name  = {props.name} bio = {props.bio}/>
  }

  displayUsers = (users) => {
    if(!users.length) return null;
    users = users.slice(3,8);
    return users.map((users, index) => (
      //<div key = {index}>
        //<h3>{users.name}</h3>
        //<p>{users.email}</p>
        //<p>{index}</p>
        <div class="row">            
          <div class="col-md-4"></div>
          <div class = "card-group " key = {index} >
            <this.cardchoice name  = {users.name} bio = {users.bio} num = {index}/>
          </div>
        </div>
      //</div>
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