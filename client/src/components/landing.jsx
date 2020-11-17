import React, { Component } from 'react'
import axios from 'axios'
import TestCard from './TestCard'
import Cardflip from './Cardflip'
import CarouselHomepage from './CarouselHomepage'
import Autosuggest from 'react-autosuggest';
import { CarouselCard } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faHandshake, faLanguage, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './landing.css';

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
    if(props.num % 2 === 0){
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
      <div className = "page-wrapper">
        <CarouselHomepage/>

        <div className ="searchbar" >
          <h2 className = "searchH2">
            Find a user on the site
          </h2>
          
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
        

          <div className = "expln">
              <h2 className = "explH2">
                  Get yourself closer to your dream job!
              </h2>

              <div className = "cards">
                  <p>
                  <div class="homecard">
                      <div class="container">
                          <FontAwesomeIcon icon = {faHandshake} size = "4x" className = "cimg" />
                          <h4><b>Find jobs easily</b></h4>
                          <br/>
                          <p>
                              Swat Kats allows you to present your professional image to the world,
                              through your academic achievements and other skills. Employers watch
                              this site too, you never know what opportunities lie around the corner!
                          </p>
                      </div>
                  </div>
                  </p>        

                  <p>
                  <div class="homecard">
                      <div class="container">
                          <FontAwesomeIcon icon = {faUserPlus} size = "4x" className = "cimg" />
                          <h4><b>Personalise your image</b></h4>
                          <br/>
                          <p>
                              On Swat Kats, we don't just care about your results in school, we want you to
                              show off your holistic accomplishments as well. Upload images to your gallery
                              and show us what you get up to in your free time!
                          </p>
                      </div>
                  </div>
                  </p>
                  

                  <p>
                  <div class="homecard"> 
                      <div class="container">
                          <FontAwesomeIcon icon = {faLanguage} size = "4x" className = "cimg" />
                          <h4><b>Support for different languages</b></h4>
                          <br/>
                          <p>
                              We understand that we all come from different cultural backgrounds
                              and speak different languages. To accommodate this, we have translations
                              supported for Mandarin Chinese and Japanese - click the "Language Options" button above!
                          </p>
                      </div>
                  </div>
                  </p>
              </div>
            </div>
      </div>
    )
  }
}

export default Landing