/* eslint-disable max-len */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import userData from '../data/userData';
import nutrientReference from '../data/nutrientReference';
import '../stylesheets/nutrientInfo.css';
import '../stylesheets/slider.css';
import NavBar from './NavBar';
function NutrientInfo() {
    var location = useLocation();
    var _a = location.state, dbTable = _a.dbTable, dbId = _a.dbId;
    var _b = useState({}), nutrientInfo = _b[0], setNutrientInfo = _b[1];
    var _c = useState(false), nutrientInfoFetched = _c[0], setNutrientInfoFetched = _c[1];
    var _d = useState({}), servings = _d[0], setServingInfo = _d[1];
    var _e = useState(false), servingsFetched = _e[0], setServingsFetched = _e[1];
    var _f = useState(1), gramWeight = _f[0], setGramWeight = _f[1];
    var _g = useState(100), quantity = _g[0], setQuantity = _g[1];
    var _h = useState(false), percentBool = _h[0], setPercentBool = _h[1];
    // Fetch info from DB
    // If the data has not been fetched yet
    if (!nutrientInfoFetched) {
        fetch("/api/getNutrients?table=".concat(dbTable, "&id=").concat(dbId))
            .then(function (res) { return res.json(); })
            .then(function (dbResponse) {
            var _a;
            setNutrientInfoFetched(true);
            setNutrientInfo(dbResponse[0]);
            if (dbTable !== 'food') {
                setServingsFetched(true);
                setServingInfo((_a = {}, _a[dbResponse[0].units] = 100, _a));
                setGramWeight(100);
                setQuantity(1);
            }
        })
            .catch(function (err) { return console.log('SearchBox.submitSearch ERROR: ', err); });
    }
    if (!servingsFetched && dbTable === 'food') {
        fetch("/api/getServings?id=".concat(dbId))
            .then(function (res) { return res.json(); })
            .then(function (servingData) {
            setServingsFetched(true);
            setServingInfo(servingData);
        })
            .catch(function (err) { return console.log('SearchBox.submitSearch ERROR: ', err); });
    }
    function changeAmount(e) {
        var _a = e.target, id = _a.id, value = _a.value;
        switch (id) {
            case 'unitsSelect':
                if (value === 'g')
                    setGramWeight(100);
                else
                    setGramWeight(servings[value]);
                break;
            case 'quantityInput':
                setQuantity(value);
                break;
            case 'percentSwitch':
                setPercentBool(!percentBool);
                break;
            default:
                break;
        }
    }
    var servingOptionsDivs = [];
    // SERVING INFO //
    if (servings) {
        if (dbTable === 'food') {
            servingOptionsDivs.push(React.createElement("option", { value: "g" }, "grams"));
        }
        Object.keys(servings).forEach(function (servingName) {
            servingOptionsDivs.push(React.createElement("option", { value: servingName }, servingName));
        });
    }
    // NUTRITION INFO //
    var nutrientCategoryContainer = [];
    var labelDivs = [];
    var vitaminDivs = [];
    var mineralDivs = [];
    var keyCounter = 1;
    // If nutrition info exists
    if (nutrientInfo.name) {
        Object.entries(nutrientInfo).forEach(function (_a) {
            var nutrient = _a[0], amount = _a[1];
            var type = nutrientReference[nutrient].type;
            if (type !== 'info') {
                var calculatedAmount = (amount / 100) * gramWeight * quantity;
                // Adjust for percentage
                var displayAmount = '';
                if (percentBool && type !== 'label') {
                    calculatedAmount = (calculatedAmount / userData[nutrient].rda) * 100;
                    displayAmount = "".concat(Math.round(calculatedAmount * (10)) / 10, "%");
                }
                else {
                    // Adjust for gramWeight
                    var decimalPlace = 0;
                    var roundAmount = calculatedAmount;
                    if (calculatedAmount < 0.001)
                        decimalPlace = 5;
                    else if (calculatedAmount < 0.01)
                        decimalPlace = 4;
                    else if (calculatedAmount < 0.1)
                        decimalPlace = 3;
                    else if (calculatedAmount < 1)
                        decimalPlace = 2;
                    else if (calculatedAmount < 100)
                        decimalPlace = 1;
                    else
                        decimalPlace = 0;
                    if (decimalPlace > 0) {
                        roundAmount = Math.round(calculatedAmount * (Math.pow(10, decimalPlace))) / (Math.pow(10, decimalPlace));
                    }
                    displayAmount = "".concat(new Intl.NumberFormat().format(roundAmount), " ").concat(nutrientReference[nutrient].units);
                }
                var newInfoCouple = (React.createElement("div", { key: "infoCouple".concat(keyCounter++), className: "infoCouple" },
                    React.createElement("div", null, nutrientReference[nutrient].displayName),
                    React.createElement("div", null, displayAmount)));
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
        nutrientCategoryContainer.push(React.createElement("div", { className: "nutrientInfoContainer" },
            React.createElement("div", { className: "nutrientCategoryContainers" },
                React.createElement("div", { className: "labelDivs categoryContainer" }, labelDivs),
                React.createElement("div", { className: "vitaminDivs categoryContainer" }, vitaminDivs),
                React.createElement("div", { className: "mineralDivs categoryContainer" }, mineralDivs))));
    }
    return (React.createElement("div", { className: "nutrientBodyContainer" },
        React.createElement(NavBar, null),
        React.createElement("div", { className: "foodNameDiv" }, nutrientInfo.name),
        React.createElement("div", { className: "quantityDiv" },
            React.createElement("input", { type: "text", name: "quantityInput", id: "quantityInput", placeholder: "100", onChange: changeAmount }),
            React.createElement("select", { name: "unitsSelect", id: "unitsSelect", onChange: changeAmount }, servingOptionsDivs),
            React.createElement("span", null, "RDA Percentage"),
            React.createElement("label", { className: "switch", htmlFor: "percentSwitch" },
                React.createElement("input", { type: "checkbox", name: "percentSwitch", id: "percentSwitch", onChange: changeAmount }),
                React.createElement("span", { className: "slider round" }))),
        React.createElement("div", null, nutrientCategoryContainer)));
}
export default NutrientInfo;
