/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import '../../stylesheets/newDish/createDish.css';
import NavBar from '../NavBar';
import MyDish from './NewDish';
import IngredientSearchContainer from './IngredientSearchContainer';

class CreateDish extends Component {
  constructor() {
    super();
    this.state = {
      ingredients: [],
      searchResults: [],
    };
    this.submitSearch = this.submitSearch.bind(this);
    this.submitIngredient = this.submitIngredient.bind(this);
  }

  submitIngredient(id, name, index) {
    const newIngredient = {
      id,
      name,
      quantity: document.querySelector(`#ingredientQuantity${index}`).value,
      units: document.querySelector(`#ingredientUnits${index}`).value,
    };

    document.querySelector('#searchBar').value = '';
    // const searchResultsDiv = document.querySelector('.searchResultsDiv');
    // while (searchResultsDiv.hasChildNodes()) {
    //   searchResultsDiv.removeChild(searchResultsDiv.lastChild);
    // }

    const newState = { ...this.state };
    newState.searchResults = [];
    newState.ingredients.push(newIngredient);
    this.setState(newState);
  }

  submitSearch(e) {
    e.preventDefault();
    const searchStr = e.target.elements.searchBar.value;
    fetch(`/api/searchFoods?q=${searchStr}`)
      .then((res) => res.json())
      .then((dbResponse) => {
        const newState = { ...this.state };
        newState.searchResults = dbResponse;
        this.setState(newState);
      })
      .catch((err) => console.log('CreatDish.submitSearch ERROR: ', err));
  }

  render() {
    const { ingredients, searchResults } = this.state;
    return (
      <div className="bodyContainer">
        <div className="createDishContainer">
          <NavBar />
          <MyDish ingredients={ingredients} />
          <IngredientSearchContainer
            submitSearch={this.submitSearch}
            submitIngredient={this.submitIngredient}
            searchResults={searchResults}
          />
        </div>
      </div>
    );
  }
}

export default CreateDish;
