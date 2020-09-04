import React, { Component } from 'react'

class Profile extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
    <h1 className="text-center">WELCOME {this.props.name}</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;