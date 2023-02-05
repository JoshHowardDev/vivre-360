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
import { Link } from 'react-router-dom';
import '../stylesheets/searchContainer.css';
var SearchContainer = /** @class */ (function (_super) {
    __extends(SearchContainer, _super);
    function SearchContainer() {
        var _this = _super.call(this) || this;
        _this.state = {
            searchResults: [],
        };
        _this.submitSearch = _this.submitSearch.bind(_this);
        return _this;
    }
    SearchContainer.prototype.submitSearch = function (e) {
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
            .catch(function (err) { return console.log('SearchBox.submitSearch ERROR: ', err); });
    };
    SearchContainer.prototype.render = function () {
        var searchResults = this.state.searchResults;
        var searchResultsDivs = [];
        var maxSearchResults = Math.min(1000, searchResults.length);
        if (searchResults.length) {
            for (var i = 0; i < maxSearchResults; i += 1) {
                var newDiv = (React.createElement("div", { key: "searchResult".concat(i), className: "searchItem" },
                    React.createElement(Link, { to: "/nutrientInfo", state: { dbTable: searchResults[i].table, dbId: searchResults[i].id } }, searchResults[i].name)));
                searchResultsDivs.push(newDiv);
            }
        }
        return (React.createElement("div", { className: "searchContainer" },
            React.createElement("form", { className: "searchForm", onSubmit: this.submitSearch },
                React.createElement("input", { type: "text", name: "searchBar", id: "searchBar", placeholder: "Search..." })),
            React.createElement("div", { className: "searchResultsDiv" }, searchResultsDivs)));
    };
    return SearchContainer;
}(Component));
export default SearchContainer;
