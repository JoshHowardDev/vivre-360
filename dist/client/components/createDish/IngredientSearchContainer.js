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
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import '../../stylesheets/newDish/ingredientSearchContainer.css';
import extednArrowIMG from '../../images/extendArrow.png';
var IngredientSearchContainer = /** @class */ (function (_super) {
    __extends(IngredientSearchContainer, _super);
    function IngredientSearchContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IngredientSearchContainer.prototype.render = function () {
        var _a = this.props, submitIngredient = _a.submitIngredient, searchResults = _a.searchResults, submitSearch = _a.submitSearch;
        function toggleExtendedOptions(e) {
            var searchResultIndex = e.target.getAttribute('data-searchresultindex');
            var extendedDiv = document.querySelector("[data-extendedoptionsindex=\"".concat(searchResultIndex, "\"]"));
            extendedDiv.classList.toggle('searchResultCollapsed');
        }
        var searchResultsDivs = [];
        var maxSearchResults = Math.min(1000, searchResults.length);
        if (searchResults.length) {
            var _loop_1 = function (i) {
                var newDiv = (React.createElement("div", { key: "ingredientSearchResult".concat(i), className: "searchItem" },
                    React.createElement("div", { className: "searchResultItem" },
                        React.createElement("span", null, searchResults[i].name),
                        React.createElement("img", { src: extednArrowIMG, alt: "", "data-searchresultindex": i, onClick: toggleExtendedOptions })),
                    React.createElement("div", { className: "extendedOptions searchResultCollapsed", "data-extendedoptionsindex": i },
                        React.createElement("form", { className: "ingredientDetailsForm" },
                            React.createElement("input", { type: "text", name: "ingredientQuantity", id: "ingredientQuantity".concat(i) }),
                            React.createElement("select", { name: "ingredientUnits", id: "ingredientUnits".concat(i) },
                                React.createElement("option", { value: "g" }, "grams")),
                            React.createElement("img", { src: "/src/greenCross.png", alt: "Add Button", onClick: function () {
                                    submitIngredient(searchResults[i].id, searchResults[i].name, i);
                                } })))));
                searchResultsDivs.push(newDiv);
            };
            for (var i = 0; i < maxSearchResults; i += 1) {
                _loop_1(i);
            }
        }
        return (React.createElement("div", { className: "ingredientSearchContainer" },
            React.createElement("form", { className: "searchForm", onSubmit: submitSearch },
                React.createElement("input", { type: "text", name: "searchBar", id: "searchBar", placeholder: "Search to Add..." })),
            React.createElement("div", { className: "searchResultsDiv", key: "".concat(searchResults, "12") }, searchResultsDivs)));
    };
    return IngredientSearchContainer;
}(Component));
export default IngredientSearchContainer;
