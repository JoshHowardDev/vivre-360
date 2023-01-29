/* eslint-disable react/prop-types */
import React from 'react';
import nutrientReference from '../../data/nutrientReference';
import userData from '../../data/userData';
import '../../stylesheets/myDay/myDayNutritionDetails.css';

function MyDayNutritionDetails({ nutritionDetails }) {
  const labelDivs = [];
  const vitaminDivs = [];
  const mineralDivs = [];

  const percentBool = true;
  let keyCounter = 0;
  const newNutritionDivs = [];
  Object.entries(nutritionDetails).forEach(([nutrient, amount]) => {
    const { type } = nutrientReference[nutrient];

    if (type !== 'info') {
      let calculatedAmount = amount;

      // Adjust for percentage
      let displayAmount = '';
      if (percentBool && type !== 'label') {
        calculatedAmount = (calculatedAmount / userData[nutrient].rda) * 100;
        displayAmount = `${Math.round(calculatedAmount * (10)) / 10}%`;
      } else {
        // Adjust for gramWeight
        let decimalPlace = 0;
        let roundAmount = calculatedAmount;
        if (calculatedAmount < 0.001) decimalPlace = 5;
        else if (calculatedAmount < 0.01) decimalPlace = 4;
        else if (calculatedAmount < 0.1) decimalPlace = 3;
        else if (calculatedAmount < 1) decimalPlace = 2;
        else if (calculatedAmount < 100) decimalPlace = 1;
        else decimalPlace = 0;

        if (decimalPlace > 0) {
          roundAmount = Math.round(calculatedAmount * (10 ** decimalPlace)) / (10 ** decimalPlace);
        }
        displayAmount = `${new Intl.NumberFormat().format(roundAmount)} ${nutrientReference[nutrient].units}`;
      }

      const newInfoCouplet = (
        <div key={`infoCouple${keyCounter++}`} className="infoCouple">
          <div>{nutrientReference[nutrient].displayName}</div>
          <div>{displayAmount}</div>
        </div>
      );

      switch (type) {
        case 'label':
          labelDivs.push(newInfoCouplet);
          break;
        case 'vitamin':
          vitaminDivs.push(newInfoCouplet);
          break;
        case 'mineral':
          mineralDivs.push(newInfoCouplet);
          break;
        default:
          break;
      }
    }
  });

  if (labelDivs.length) {
    newNutritionDivs.push(
      <div className="nutritionDetailsContainer">
        <div className="nutritionDetailsCategoryContainers">
          <div className="nutritionLabelDivs dayCategoryContainer">{labelDivs}</div>
          <h2>Vitamins</h2>
          <div className="nutritionVitaminDivs dayCategoryContainer">{vitaminDivs}</div>
          <h2>Minerals</h2>
          <div className="nutritionMineralDivs dayCategoryContainer">{mineralDivs}</div>
        </div>
      </div>,
    );
  }

  return (
    <div className="nutritionDetailsContainer">
      <h2>Nutrition Details</h2>
      {newNutritionDivs}
    </div>

  );
}

export default MyDayNutritionDetails;
