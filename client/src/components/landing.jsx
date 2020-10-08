import React, { Component } from 'react'
import axios from 'axios'
import TestCard from './TestCard'
import Cardflip from './Cardflip'
import CarouselHomepage from './CarouselHomepage'
import Autosuggest from 'react-autosuggest';


class Landing extends Component {

  state = {
    users: [],
    names:[],
    value:'',
    suggestions:[]
  }


  // Teach Autosuggest how to calculate suggestions for any given input value.
getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : (this.state.names).filter(name =>
    name.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (suggestion, suggestionValue) => {
    console.log(suggestionValue.suggestion.email);
    const useremail = suggestionValue.suggestion.email;

    window.location.href = ("/public/" + useremail);
  }

  getUserDetails = () => {
    axios.get('/users')
      .then((response) => {
        const data = response.data;
        this.setState({users : data});
        const names = data.map((item) => {
          return {
            name: item.name,
            email: item.email
          }
        });
        console.log(names);
        this.setState({names: names});
        
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

    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a name',
      value,
      onChange: this.onChange
    };





    return (
      // <p>Welcome to Swat Kats!</p>
      
      <div>
        <CarouselHomepage/>
        <div className = "users">
          {this.displayUsers(this.state.users)}
        </div>
        <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
      </div>
    )
  }
}

export default Landing