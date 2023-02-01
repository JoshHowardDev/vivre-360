/* eslint-disable react/prop-types */
import React from 'react';
import nutrientReference from '../../data/nutrientReference';
import userData from '../../data/userData';
import '../../stylesheets/myDay/myDayNutritionDetails.css';
function MyDayNutritionDetails(_a) {
    var nutritionDetails = _a.nutritionDetails;
    var labelDivs = [];
    var vitaminDivs = [];
    var mineralDivs = [];
    var percentBool = true;
    var keyCounter = 0;
    var newNutritionDivs = [];
    Object.entries(nutritionDetails).forEach(function (_a) {
        var nutrient = _a[0], amount = _a[1];
        var type = nutrientReference[nutrient].type;
        if (type !== 'info') {
            var calculatedAmount = amount;
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
            var newInfoCouplet = (React.createElement("div", { key: "infoCouple".concat(keyCounter++), className: "infoCouple" },
                React.createElement("div", null, nutrientReference[nutrient].displayName),
                React.createElement("div", null, displayAmount)));
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
        newNutritionDivs.push(React.createElement("div", { className: "nutritionDetailsContainer" },
            React.createElement("div", { className: "nutritionDetailsCategoryContainers" },
                React.createElement("div", { className: "nutritionLabelDivs dayCategoryContainer" }, labelDivs),
                React.createElement("h2", null, "Vitamins"),
                React.createElement("div", { className: "nutritionVitaminDivs dayCategoryContainer" }, vitaminDivs),
                React.createElement("h2", null, "Minerals"),
                React.createElement("div", { className: "nutritionMineralDivs dayCategoryContainer" }, mineralDivs))));
    }
    return (React.createElement("div", { className: "nutritionDetailsContainer" },
        React.createElement("h2", null, "Nutrition Details"),
        newNutritionDivs));
}
export default MyDayNutritionDetails;
