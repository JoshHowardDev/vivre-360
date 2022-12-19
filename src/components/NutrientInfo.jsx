/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const nutrientReference = require('../data/nutrientReference');

function NutrientInfo() {
  const location = useLocation();
  const { foodId } = location.state;
  const [nutrientInfo, setNutrientInfo] = useState({});

  const nutritionInfoDiv = [];
  let keyCounter = 1;

  // If nutrition info exists
  if (nutrientInfo.name) {
    nutritionInfoDiv.push(<div className="foodNameDiv">{nutrientInfo.name}</div>);

    Object.entries(nutrientInfo).forEach(([nutrient, amount]) => {
      const { type } = nutrientReference[nutrient];

      if (type !== 'info') {
        let decimalPlace = 0;
        let roundAmount = amount;
        if (amount < 0.001) decimalPlace = 5;
        else if (amount < 0.01) decimalPlace = 4;
        else if (amount < 0.1) decimalPlace = 3;
        else if (amount < 1) decimalPlace = 2;
        else if (amount < 100) decimalPlace = 1;
        else decimalPlace = 0;

        if (decimalPlace > 0) {
          roundAmount = Math.round(amount * (10 ** decimalPlace)) / (10 ** decimalPlace);
        }
        nutritionInfoDiv.push(
          <div key={`infoCouple${keyCounter++}`} className="infoCouple">
            <div>{nutrientReference[nutrient].displayName}</div>
            <div>{`${new Intl.NumberFormat().format(roundAmount)} ${nutrientReference[nutrient].units}`}</div>
          </div>,
        );
      }
    });

    // If nutrition info doesn't exist, fetch it
  } else {
    fetch(`/api/getNutrients?id=${foodId}`)
      .then((res) => res.json())
      .then((dbResponse) => {
        setNutrientInfo(dbResponse[0]);
      })
      .catch((err) => console.log('SearchBox.submitSearch ERROR: ', err));
  }

  return (
    <div>{nutritionInfoDiv}</div>
  );
}

export default NutrientInfo;
