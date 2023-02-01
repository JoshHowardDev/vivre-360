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
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import '../../stylesheets/myDay/myDayFoodSearchContainer.css';
import extednArrowIMG from '../../../server/static/extendArrow.png';
var MyDayFoodSearchContainer = /** @class */ (function (_super) {
    __extends(MyDayFoodSearchContainer, _super);
    function MyDayFoodSearchContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyDayFoodSearchContainer.prototype.render = function () {
        var _a = this.props, submitFood = _a.submitFood, searchResults = _a.searchResults, submitSearch = _a.submitSearch;
        function toggleExtendedOptions(e) {
            var searchResultIndex = e.target.getAttribute('data-searchresultindex');
            var extendedDiv = document.querySelector("[data-extendedoptionsindex=\"".concat(searchResultIndex, "\"]"));
            extendedDiv.classList.toggle('searchResultCollapsed');
        }
        var searchResultsDivs = [];
        var maxSearchResults = Math.min(1000, searchResults.length);
        if (searchResults.length) {
            var _loop_1 = function (i) {
                var newDiv = (React.createElement("div", { key: "foodSearchResult".concat(i), className: "searchItem" },
                    React.createElement("div", { className: "searchResultItem" },
                        React.createElement("span", null, searchResults[i].name),
                        React.createElement("img", { src: extednArrowIMG, alt: "", "data-searchresultindex": i, onClick: toggleExtendedOptions })),
                    React.createElement("div", { className: "extendedOptions searchResultCollapsed", "data-extendedoptionsindex": i },
                        React.createElement("form", { className: "foodDetailsForm" },
                            React.createElement("input", { type: "text", name: "foodQuantity", id: "foodQuantity".concat(i) }),
                            React.createElement("select", { name: "foodUnits", id: "foodUnits".concat(i) },
                                React.createElement("option", { value: "g" }, "grams")),
                            React.createElement("img", { src: "/assets/greenCross.png", alt: "Add Button", onClick: function () {
                                    submitFood(searchResults[i].id, searchResults[i].table, searchResults[i].name, i);
                                } })))));
                searchResultsDivs.push(newDiv);
            };
            for (var i = 0; i < maxSearchResults; i += 1) {
                _loop_1(i);
            }
        }
        return (React.createElement("div", { className: "foodSearchContainer" },
            React.createElement("form", { className: "searchForm", onSubmit: submitSearch },
                React.createElement("input", { type: "text", name: "searchBar", id: "searchBar", placeholder: "Search to Add..." })),
            React.createElement("div", { className: "searchResultsContainer", key: "".concat(searchResults, "12") }, searchResultsDivs)));
    };
    return MyDayFoodSearchContainer;
}(Component));
export default MyDayFoodSearchContainer;
