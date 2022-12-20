/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import '../stylesheets/myDish.css';

class MyDish extends Component {
  constructor() {
    super();
    this.state = {
      ingredients: [],
    };
  }

  render() {
    const { ingredients } = this.state;
    return (
      <div className="myDishContainer">
        <h1>My Dish</h1>
        <label htmlFor="unitNameInput">
          Unit Name
          <input type="text" name="unitNameInput" id="unitNameInput" />
        </label>
        <div className="ingredientsContainer">
          <h2>Ingredients</h2>
          {ingredients}
        </div>
      </div>
    );
  }
}

export default MyDish;
