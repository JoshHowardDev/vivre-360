var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { Component } from 'react';
import '../../stylesheets/newDish/createDish.css';
import NavBar from '../NavBar';
import MyDish from './NewDish';
import IngredientSearchContainer from './IngredientSearchContainer';
var CreateDish = /** @class */ (function (_super) {
    __extends(CreateDish, _super);
    function CreateDish() {
        var _this = _super.call(this) || this;
        _this.state = {
            ingredients: [],
            searchResults: [],
        };
        _this.submitSearch = _this.submitSearch.bind(_this);
        _this.submitIngredient = _this.submitIngredient.bind(_this);
        return _this;
    }
    CreateDish.prototype.submitIngredient = function (id, name, index) {
        var newIngredient = {
            id: id,
            name: name,
            quantity: document.querySelector("#ingredientQuantity".concat(index)).value,
            units: document.querySelector("#ingredientUnits".concat(index)).value,
        };
        document.querySelector('#searchBar').value = '';
        var newState = __assign({}, this.state);
        newState.searchResults = [];
        newState.ingredients.push(newIngredient);
        this.setState(newState);
    };
    CreateDish.prototype.submitSearch = function (e) {
        var _this = this;
        e.preventDefault();
        var searchStr = e.target.elements.searchBar.value;
        fetch("/api/searchFoods?q=".concat(searchStr))
            .then(function (res) { return res.json(); })
            .then(function (dbResponse) {
            var newState = __assign({}, _this.state);
            newState.searchResults = dbResponse;
            _this.setState(newState);
        })
            .catch(function (err) { return console.log('CreatDish.submitSearch ERROR: ', err); });
    };
    CreateDish.prototype.render = function () {
        var _a = this.state, ingredients = _a.ingredients, searchResults = _a.searchResults;
        return (React.createElement("div", { className: "createDishContainer" },
            React.createElement(NavBar, null),
            React.createElement(MyDish, { ingredients: ingredients }),
            React.createElement(IngredientSearchContainer, { submitSearch: this.submitSearch, submitIngredient: this.submitIngredient, searchResults: searchResults })));
    };
    return CreateDish;
}(Component));
export default CreateDish;
