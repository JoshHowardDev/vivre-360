/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/myDish.css';

function MyDish(props) {
  const { ingredients } = props;
  const navigate = useNavigate();

  const ingredientDivs = [];
  ingredients.forEach(({ name, quantity, units }) => {
    ingredientDivs.push(
      <div key={`ingredient${name}`} className="ingredientDiv">
        <span className="ingredientQuantity">{quantity}</span>
        <span className="ingredientUnits">{units}</span>
        <span className="ingredientName">{name}</span>
      </div>,
    );
  });

  async function useAddDish(ingredientsArr) {
    await fetch('/api/addDish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 42,
        name: document.querySelector('#dishNameInput').value,
        units: document.querySelector('#unitNameInput').value,
        ingredientsArr,
      }),
    });
    navigate('/');
  }

  return (
    <div className="myDishContainer" key={ingredients}>
      <h1>My Dish</h1>
      <label htmlFor="unitNameInput">
        Dish Name
        <input type="text" name="dishNameInput" id="dishNameInput" />
      </label>
      <label htmlFor="unitNameInput">
        Unit Name
        <input type="text" name="unitNameInput" id="unitNameInput" />
      </label>
      <div className="ingredientsContainer">
        <h2>Ingredients</h2>
        {ingredientDivs}
      </div>
      <button type="button" onClick={() => { useAddDish(ingredients); }}>Add Dish</button>
    </div>
  );
}

export default MyDish;
