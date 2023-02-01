var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/* eslint-disable max-len */
/* eslint-disable operator-assignment */
import React, { useCallback, useEffect, useState } from 'react';
import '../../stylesheets/myDay/myDay.css';
import nutrientReference from '../../data/nutrientReference';
import NavBar from '../NavBar';
import MyDayFoodSearchContainer from './MyDayFoodSearchContainer';
import MyDayNutritionDetails from './MyDayNutritionDetails';
function MyDay() {
    var _a = useState([]), foods = _a[0], setFoods = _a[1];
    var _b = useState([]), foodDivs = _b[0], setFoodDivs = _b[1];
    var _c = useState([]), searchResults = _c[0], setSearchResults = _c[1];
    var _d = useState([]), nutritionDetails = _d[0], setNutritionDetails = _d[1];
    var submitFood = useCallback(function (id, table, name, index) {
        // Fetch new food nutrient details and update nutrition details
        fetch("/api/getNutrients?table=".concat(table, "&id=").concat(id))
            .then(function (res) { return res.json(); })
            .then(function (dbResponse) {
            var foodItemNutrientInfo = dbResponse[0];
            var newNutritionDetails = nutritionDetails;
            Object.entries(foodItemNutrientInfo).forEach(function (_a) {
                var nutrient = _a[0], amount = _a[1];
                if (nutrientReference[nutrient].type !== 'info') {
                    if (newNutritionDetails[nutrient]) {
                        newNutritionDetails[nutrient] = Number(newNutritionDetails[nutrient]) + Number(amount);
                    }
                    else {
                        newNutritionDetails[nutrient] = Number(amount);
                    }
                }
            });
            setNutritionDetails(newNutritionDetails);
            // Set Foods List
            var newFood = {
                id: id,
                name: name,
                quantity: document.querySelector("#foodQuantity".concat(index)).value,
                units: document.querySelector("#foodUnits".concat(index)).value,
            };
            document.querySelector('#searchBar').value = '';
            setSearchResults([]);
            var newFoods = [];
            newFoods.push.apply(newFoods, __spreadArray(__spreadArray([], foods, false), [newFood], false));
            setFoods(newFoods);
        })
            .catch(function (err) { return console.log('SearchBox.submitSearch ERROR: ', err); });
    });
    var submitSearch = useCallback(function (e) {
        e.preventDefault();
        var searchStr = e.target.elements.searchBar.value;
        fetch("/api/searchFoods?q=".concat(searchStr))
            .then(function (res) { return res.json(); })
            .then(function (dbResponse) {
            setSearchResults(dbResponse);
        })
            .catch(function (err) { return console.log('CreatDish.submitSearch ERROR: ', err); });
    });
    useEffect(function () {
        // Update Food Divs
        var newFoodDivs = [];
        foods.forEach(function (food) {
            newFoodDivs.push(React.createElement("div", null, food.name));
        });
        setFoodDivs(newFoodDivs);
    }, [foods]);
    return (React.createElement(React.Fragment, null,
        React.createElement(NavBar, null),
        React.createElement("div", { className: "dayDetailsContainer" },
            React.createElement(MyDayNutritionDetails, { nutritionDetails: nutritionDetails }),
            React.createElement("div", { className: "foodsContainer" },
                React.createElement("h2", null, "Foods"),
                foodDivs)),
        React.createElement(MyDayFoodSearchContainer, { submitSearch: submitSearch, submitFood: submitFood, searchResults: searchResults })));
}
export default MyDay;
