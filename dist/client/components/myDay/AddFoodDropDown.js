/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line object-curly-newline
function AddFoodDropDown(_a) {
    var searchIndex = _a.searchIndex, foodDbId = _a.foodDbId, foodName = _a.foodName, submitFood = _a.submitFood;
    var _b = useState([]), servingOptions = _b[0], setServingOptions = _b[1];
    useEffect(function () {
        fetch("/api/getServings?id=".concat(foodDbId))
            .then(function (res) { return res.json(); })
            .then(function (servingData) {
            var newOptionsDivs = [];
            Object.keys(servingData).forEach(function (servingName) {
                newOptionsDivs.push(React.createElement("option", { value: servingName }, servingName));
            });
            setServingOptions(newOptionsDivs);
        })
            .catch(function (err) { return console.log('SearchBox.submitSearch ERROR: ', err); });
    });
    return (React.createElement("div", { className: "extendedOptions", "data-extendedoptionsindex": searchIndex },
        React.createElement("form", { className: "foodDetailsForm" },
            React.createElement("input", { type: "text", name: "foodQuantity", id: "foodQuantity".concat(searchIndex) }),
            React.createElement("select", { name: "foodUnits", id: "foodUnits".concat(searchIndex) }, servingOptions),
            React.createElement("img", { src: "/assets/greenCross.png", alt: "Add Button", onClick: function () {
                    submitFood(foodDbId, foodName, searchIndex);
                } }))));
}
export default AddFoodDropDown;
