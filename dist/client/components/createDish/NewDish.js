var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../stylesheets/newDish/newDish.css';
function NewDish(props) {
    var ingredients = props.ingredients;
    var navigate = useNavigate();
    var ingredientDivs = [];
    ingredients.forEach(function (_a) {
        var name = _a.name, quantity = _a.quantity, units = _a.units;
        ingredientDivs.push(React.createElement("div", { key: "ingredient".concat(name), className: "ingredientDiv" },
            React.createElement("span", { className: "ingredientQuantity" }, quantity),
            React.createElement("span", { className: "ingredientUnits" }, units),
            React.createElement("span", { className: "ingredientName" }, name)));
    });
    function useAddDish(ingredientsArr) {
        return __awaiter(this, void 0, void 0, function () {
            var name, units, dbResponse, parsedResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = document.querySelector('#dishNameInput').value;
                        units = document.querySelector('#unitNameInput').value;
                        if (!name.length || !units.length || !ingredientsArr.length) {
                            return [2 /*return*/, alert('You must enter a name, a unit name, and at least one ingredient.')];
                        }
                        return [4 /*yield*/, fetch('/api/addDish', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    userId: 42,
                                    name: name,
                                    units: units,
                                    ingredientsArr: ingredientsArr,
                                }),
                            })];
                    case 1:
                        dbResponse = _a.sent();
                        return [4 /*yield*/, dbResponse.json()];
                    case 2:
                        parsedResponse = _a.sent();
                        return [2 /*return*/, navigate('/nutrientInfo', { state: { dbTable: 'dishes', dbId: parsedResponse.id } })];
                }
            });
        });
    }
    // Don't show ingredients section if there are no ingredients yet
    var ingredientsDiv = [];
    if (ingredientDivs.length) {
        ingredientsDiv.push(React.createElement("div", { className: "newDishBottomContainer" },
            React.createElement("div", { className: "ingredientsContainer" },
                React.createElement("h2", null, "Ingredients"),
                ingredientDivs),
            React.createElement("button", { type: "button", className: "submitButton", onClick: function () { useAddDish(ingredients); } }, "Add Dish")));
    }
    return (React.createElement("div", { className: "newDishContainer", key: ingredients },
        React.createElement("div", { className: "newDishDetailsDiv" },
            React.createElement("div", { className: "dishDetailsInputs" },
                React.createElement("div", { className: "dishNameInputs" },
                    React.createElement("label", { htmlFor: "dishNameInput" }, "Dish Name"),
                    React.createElement("input", { type: "text", name: "dishNameInput", id: "dishNameInput", placeholder: "My Dish" })),
                React.createElement("div", { className: "unitNameInputs" },
                    React.createElement("label", { htmlFor: "unitNameInput" }, "Unit Name"),
                    React.createElement("input", { type: "text", name: "unitNameInput", id: "unitNameInput", placeholder: "Serving" }))),
            ingredientsDiv)));
}
export default NewDish;
