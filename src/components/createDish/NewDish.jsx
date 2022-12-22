/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../stylesheets/newDish/newDish.css';

function NewDish(props) {
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
    const name = document.querySelector('#dishNameInput').value;
    const units = document.querySelector('#unitNameInput').value;

    if (!name.length || !units.length || !ingredientsArr.length) {
      return alert('You must enter a name, a unit name, and at least one ingredient.');
    }

    const dbResponse = await fetch('/api/addDish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 42,
        name,
        units,
        ingredientsArr,
      }),
    });
    const parsedResponse = await dbResponse.json();
    return navigate('/nutrientInfo', { state: { dbTable: 'dishes', dbId: parsedResponse.id } });
  }

  // Don't show ingredients section if there are no ingredients yet
  const ingredientsDiv = [];
  if (ingredientDivs.length) {
    ingredientsDiv.push(
      <div className="newDishBottomContainer">
        <div className="ingredientsContainer">
          <h2>Ingredients</h2>
          {ingredientDivs}
        </div>
        <button type="button" className="submitButton" onClick={() => { useAddDish(ingredients); }}>Add Dish</button>
      </div>,
    );
  }

  return (
    <div className="newDishContainer" key={ingredients}>
      <div className="newDishDetailsDiv">
        <div className="dishDetailsInputs">
          <div className="dishNameInputs">
            <label htmlFor="dishNameInput">Dish Name</label>
            <input type="text" name="dishNameInput" id="dishNameInput" placeholder="My Dish" />
          </div>
          <div className="unitNameInputs">
            <label htmlFor="unitNameInput">Unit Name</label>
            <input type="text" name="unitNameInput" id="unitNameInput" placeholder="Serving" />
          </div>
        </div>
        {ingredientsDiv}
      </div>
    </div>
  );
}

export default NewDish;
