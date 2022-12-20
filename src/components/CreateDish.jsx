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
  }

  render() {
    const { ingredients } = this.state;
    return (
      <div className="createDishContainer">
        <MyDish ingredients={ingredients} />
        <IngredientSearchContainer />
      </div>
    );
  }
}

export default CreateDish;
