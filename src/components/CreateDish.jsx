/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import '../stylesheets/createDish.css';
import MyDish from './MyDish';
import IngredientSearchContainer from './IngredientSearchContainer';

class CreateDish extends Component {
  constructor() {
    super();
    this.state = {
      ingredients: [],
    };
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
    const searchResultsDiv = document.querySelector('.searchResultsDiv');
    while (searchResultsDiv.hasChildNodes()) {
      searchResultsDiv.removeChild(searchResultsDiv.lastChild);
    }

    const newState = { ...this.state };
    newState.ingredients.push(newIngredient);
    this.setState(newState);
  }

  render() {
    const { ingredients } = this.state;
    return (
      <div className="createDishContainer">
        <MyDish ingredients={ingredients} />
        <IngredientSearchContainer submitIngredient={this.submitIngredient} />
      </div>
    );
  }
}

export default CreateDish;
