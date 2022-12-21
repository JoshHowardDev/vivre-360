/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../stylesheets/nutrientInfo.css';
import NavBar from './NavBar';

const nutrientReference = require('../data/nutrientReference');

function NutrientInfo() {
  const location = useLocation();
  const { dbTable, dbId } = location.state;
  const [nutrientInfo, setNutrientInfo] = useState({});
  const [nutrientInfoFetched, setNutrientInfoFetched] = useState(false);
  const [servings, setServingInfo] = useState({});
  const [servingsFetched, setServingsFetched] = useState(false);
  const [gramWeight, setGramWeight] = useState(1);
  const [quantity, setQuantity] = useState(100);

  // Fetch info from DB
  // If the data has not been fetched yet
  if (!nutrientInfoFetched) {
    fetch(`/api/getNutrients?table=${dbTable}&id=${dbId}`)
      .then((res) => res.json())
      .then((dbResponse) => {
        setNutrientInfoFetched(true);
        setNutrientInfo(dbResponse[0]);
        if (dbTable !== 'food') {
          setServingsFetched(true);
          setServingInfo({ [dbResponse[0].units]: 100 });
          setGramWeight(100);
          setQuantity(1);
        }
      })
      .catch((err) => console.log('SearchBox.submitSearch ERROR: ', err));
  }

  if (!servingsFetched && dbTable === 'food') {
    fetch(`/api/getServings?id=${dbId}`)
      .then((res) => res.json())
      .then((servingData) => {
        setServingsFetched(true);
        setServingInfo(servingData);
      })
      .catch((err) => console.log('SearchBox.submitSearch ERROR: ', err));
  }

  function changeAmount(e) {
    const { id, value } = e.target;
    switch (id) {
      case 'unitsSelect':
        if (value === 'g') setGramWeight(100);
        else setGramWeight(servings[value]);
        break;
      case 'quantityInput':
        setQuantity(value);
        break;
      default:
        break;
    }
  }

  const servingOptionsDivs = [];
  // SERVING INFO //
  if (servings) {
    if (dbTable === 'food') {
      servingOptionsDivs.push(<option value="g">grams</option>);
    }
    Object.keys(servings).forEach((servingName) => {
      servingOptionsDivs.push(<option value={servingName}>{servingName}</option>);
    });
  }

  // NUTRITION INFO //
  const nutrientCategoryContainer = [];
  const labelDivs = [];
  const vitaminDivs = [];
  const mineralDivs = [];
  let keyCounter = 1;
  // If nutrition info exists
  if (nutrientInfo.name) {
    Object.entries(nutrientInfo).forEach(([nutrient, amount]) => {
      const { type } = nutrientReference[nutrient];

      if (type !== 'info') {
        let decimalPlace = 0;
        // Adjust for gramWeight
        const calculatedAmount = (amount / 100) * gramWeight * quantity;
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

        const newInfoCouple = (
          <div key={`infoCouple${keyCounter++}`} className="infoCouple">
            <div>{nutrientReference[nutrient].displayName}</div>
            <div>{`${new Intl.NumberFormat().format(roundAmount)} ${nutrientReference[nutrient].units}`}</div>
          </div>
        );

        switch (type) {
          case 'label':
            labelDivs.push(newInfoCouple);
            break;
          case 'vitamin':
            vitaminDivs.push(newInfoCouple);
            break;
          case 'mineral':
            mineralDivs.push(newInfoCouple);
            break;
          default:
            break;
        }
      }
    });

    nutrientCategoryContainer.push(
      <div className="nutrientInfoContainer">

        <div className="nutrientCategoryContainers">
          <div className="labelDivs categoryContainer">{labelDivs}</div>
          <div className="vitaminDivs categoryContainer">{vitaminDivs}</div>
          <div className="mineralDivs categoryContainer">{mineralDivs}</div>
        </div>
      </div>,
    );
  }

  return (
    <div className="nutrientBodyContainer">
      <NavBar />
      <div className="foodNameDiv">{nutrientInfo.name}</div>
      <div className="quantityDiv">
        <input type="text" name="quantityInput" id="quantityInput" placeholder="100" onChange={changeAmount} />
        <select name="unitsSelect" id="unitsSelect" onChange={changeAmount}>
          {servingOptionsDivs}
        </select>
      </div>
      <div>{nutrientCategoryContainer}</div>
    </div>
  );
}

export default NutrientInfo;
