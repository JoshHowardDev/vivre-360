/* eslint-disable max-len */
/* eslint-disable operator-assignment */
import React, { useCallback, useEffect, useState } from 'react';
import '../../stylesheets/myDay/myDay.css';
import nutrientReference from '../../data/nutrientReference';
import NavBar from '../NavBar';
import MyDayFoodSearchContainer from './MyDayFoodSearchContainer';
import MyDayNutritionDetails from './MyDayNutritionDetails';

function MyDay() {
  const [foods, setFoods] = useState([]);
  const [foodDivs, setFoodDivs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [nutritionDetails, setNutritionDetails] = useState([]);

  const submitFood = useCallback((id, table, name, index) => {
    // Fetch new food nutrient details and update nutrition details
    fetch(`/api/getNutrients?table=${table}&id=${id}`)
      .then((res) => res.json())
      .then((dbResponse) => {
        const foodItemNutrientInfo = dbResponse[0];
        const newNutritionDetails = nutritionDetails;
        Object.entries(foodItemNutrientInfo).forEach(([nutrient, amount]) => {
          if (nutrientReference[nutrient].type !== 'info') {
            if (newNutritionDetails[nutrient]) {
              newNutritionDetails[nutrient] = Number(newNutritionDetails[nutrient]) + Number(amount);
            } else {
              newNutritionDetails[nutrient] = Number(amount);
            }
          }
        });
        setNutritionDetails(newNutritionDetails);

        // Set Foods List
        const newFood = {
          id,
          name,
          quantity: document.querySelector(`#foodQuantity${index}`).value,
          units: document.querySelector(`#foodUnits${index}`).value,
        };
        document.querySelector('#searchBar').value = '';

        setSearchResults([]);
        const newFoods = [];
        newFoods.push(...foods, newFood);
        setFoods(newFoods);
      })
      .catch((err) => console.log('SearchBox.submitSearch ERROR: ', err));
  });

  const submitSearch = useCallback((e) => {
    e.preventDefault();
    const searchStr = e.target.elements.searchBar.value;
    fetch(`/api/searchFoods?q=${searchStr}`)
      .then((res) => res.json())
      .then((dbResponse) => {
        setSearchResults(dbResponse);
      })
      .catch((err) => console.log('CreatDish.submitSearch ERROR: ', err));
  });

  useEffect(() => {
    // Update Food Divs
    const newFoodDivs = [];
    foods.forEach((food) => {
      newFoodDivs.push(
        <div>{food.name}</div>,
      );
    });
    setFoodDivs(newFoodDivs);
  }, [foods]);

  return (
    <div className="bodyContainer">
      <NavBar />
      <div className="dayDetailsContainer">
        <MyDayNutritionDetails
          nutritionDetails={nutritionDetails}
        />
        <div className="foodsContainer">
          <h2>Foods</h2>
          {foodDivs}
        </div>
      </div>
      <MyDayFoodSearchContainer
        submitSearch={submitSearch}
        submitFood={submitFood}
        searchResults={searchResults}
      />
    </div>

  );
}

export default MyDay;
